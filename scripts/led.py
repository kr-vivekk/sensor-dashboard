import time
import RPi.GPIO as gpio
import sys
import json

gpio.setwarnings(False)
gpio.setmode(gpio.BOARD)

# Set up the LED pins
led1 = 15
led2 = 12
led3 = 3
led4 = 5
gpio.setup(led1, gpio.OUT, initial=0)
gpio.setup(led2, gpio.OUT, initial=0)
gpio.setup(led3, gpio.OUT, initial=0)
gpio.setup(led4, gpio.OUT, initial=0)

def control_led(pin, duration):
    
    gpio.output(pin, True)
    time.sleep(duration)
    gpio.output(pin, False)

if __name__ == "__main__":
    try:
        data = json.loads(sys.argv[1])
        pin = data['pin']
        duration = data['duration']
        result = control_led(pin, duration)
        gpio.output(led1, False)
        gpio.output(led2, False)
        gpio.output(led3, False)
        gpio.output(led4, False)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        gpio.cleanup()
