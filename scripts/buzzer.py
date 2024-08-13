import time
import RPi.GPIO as gpio

# Disable GPIO warnings and set the GPIO mode to BOARD numbering
gpio.setwarnings(False)
gpio.setmode(gpio.BOARD)

# Set up GPIO pin 38 as an output pin
gpio.setup(38, gpio.OUT)

def trigger_buzzer():
    """
    Triggers a buzzer by turning it on and off twice with a 1-second interval.
    """
    for _ in range(2):
        gpio.output(38, 1)  # Turn the buzzer on
        print("Buzzer ON")
        time.sleep(1)  # Wait for 1 second

        gpio.output(38, 0)  # Turn the buzzer off
        print("Buzzer OFF")
        time.sleep(1)  # Wait for 1 second

if __name__ == "__main__":
    try:
        trigger_buzzer()
    except KeyboardInterrupt:
        # Cleanup GPIO settings on a keyboard interrupt
        gpio.cleanup()
        exit()

    # Cleanup GPIO settings after the program ends
    gpio.cleanup()
