import time
import RPi.GPIO as gpio

gpio.setwarnings(False)
gpio.setmode(gpio.BOARD)
gpio.setup(38, gpio.OUT)

def trigger_buzzer():
    for _ in range(2):
        gpio.output(38, 1)
        print("Buzzer ON")
        time.sleep(1)
        gpio.output(38, 0)
        print("Buzzer OFF")
        time.sleep(1)

if __name__ == "__main__":
    try:
        trigger_buzzer()
    except KeyboardInterrupt:
        gpio.cleanup()
        exit()

    gpio.cleanup()
