import time
import Adafruit_DHT
import paho.mqtt.client as mqtt
import json
import random
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008
import RPi.GPIO as GPIO

# MQTT Broker details
broker = "127.0.0.1"
port = 9001
topic = "sensor/data"

def on_connect(client, userdata, flags, rc):
    """
    Callback function for when the client receives a connection acknowledgment from the MQTT broker.

    Args:
        client: The client instance for this callback.
        userdata: The private user data as set in Client() or userdata_set().
        flags: Response flags sent by the broker.
        rc: The connection result.
    """
    if rc == 0:
        print("Connected successfully to MQTT broker")
    else:
        print("Connection failed with code " + str(rc))

# Create an MQTT client instance with WebSocket transport
client = mqtt.Client(transport="websockets")

# Assign the on_connect callback function
client.on_connect = on_connect

# Connect to the MQTT broker using WebSocket
client.connect(broker, port, 60)

# Sensor configuration
DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 4

SPI_PORT = 0
SPI_DEVICE = 0
mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE))

# Light sensor configuration using GPIO
light = 33  # Board number
GPIO.setmode(GPIO.BOARD)
GPIO.setup(light, GPIO.IN)

# Start the MQTT client loop
client.loop_start()

while True:
    # Read humidity and temperature from the DHT11 sensor
    humidity, temperature = Adafruit_DHT.read(DHT_SENSOR, DHT_PIN)
    
    # Read light sensor state, gas, and soil moisture values
    light_state = GPIO.input(light)
    gas_value = mcp.read_adc(0)
    soil = mcp.read_adc(1)
    
    # Simulate an ultrasonic sensor value
    ultrasonic = random.randint(10, 400)
    
    # Get the current timestamp in nanoseconds
    now = time.time_ns()
    
    # Handle cases where sensor data might be unavailable
    if humidity is None:
        humidity = 'null'
    if temperature is None:
        temperature = 'null'
    
    # Create the payload in JSON format
    payload = f'{{"timestamp": {now},"humidity": {humidity},"temperature": {temperature}, "gas": {gas_value}, "light": {light_state},"soil": {soil}, "ultrasonic": {ultrasonic}}}'
    
    # Publish the sensor data to the MQTT topic
    client.publish(topic, payload)
    
    # Wait for 10 seconds before the next reading
    time.sleep(10)

# Stop the MQTT client loop and disconnect
client.loop_stop()
client.disconnect()
