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
    if rc == 0:
        print("Connected successfully to MQTT broker")
    else:
        print("Connection failed with code "+rc)

# Create an MQTT client instance with WebSocket transport
client = mqtt.Client(transport="websockets")

# Assign the on_connect callback function
client.on_connect = on_connect

# Connect to the MQTT broker using WebSocket
client.connect(broker, port, 60)

# Sensor configuration
DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 4

SPI_PORT   = 0
SPI_DEVICE = 0
mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE))
light = 33 #Board number

GPIO.setmode(GPIO.BOARD)
GPIO.setup(light,GPIO.IN)

# Start the loop
client.loop_start()

while True:
    humidity, temperature = Adafruit_DHT.read(DHT_SENSOR, DHT_PIN)
    light_state = GPIO.input(light)
    gas_value = mcp.read_adc(0)
    soil = mcp.read_adc(1)
    ultrasonic = random.randint(10,400)
    now = time.time_ns()
    #if humidity is not None and temperature is not None:
    if humidity is None:
        humidity = 'null'
    if temperature is None:
        temperature = 'null'
    payload = f'{{"timestamp": {str(now)},"humidity": {humidity},"temperature": {temperature}, "gas": {gas_value}, "light": {light_state},"soil": {soil}, "ultrasonic": {ultrasonic}}}'
    client.publish(topic, payload)
    time.sleep(10)  # Adjust the interval as needed

# Stop the loop and disconnect
client.loop_stop()
client.disconnect()
