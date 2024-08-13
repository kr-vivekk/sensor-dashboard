import time
import RPi.GPIO as gpio
import sys
import json

# Disable GPIO warnings and set the GPIO mode to BOARD numbering
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
    """
    Controls an LED by turning it on for a specified duration.

    Args:
        pin (int): The GPIO pin number where the LED is connected.
        duration (int): The duration in seconds for which the LED should stay on.
    """
    gpio.output(pin, True)
    time.sleep(duration)
    gpio.output(pin, False)

if __name__ == "__main__":
    try:
        # Load the JSON data passed as a command-line argument
        data = json.loads(sys.argv[1])
        pin = data['pin']
        duration = data['duration']

        # Control the LED based on the provided pin and duration
        control_led(pin, duration)

        # Turn off all LEDs after the specified duration
        gpio.output(led1, False)
        gpio.output(led2, False)
        gpio.output(led3, False)
        gpio.output(led4, False)
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        # Clean up GPIO settings
        gpio.cleanup()
