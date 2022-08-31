import time
import network
from utility import *


class WIFI:

    def __init__(self):
        self.wifi_ssid = ''
        self.wifi_password = ''

    def connect_wifi(self, ssid, password, wait_for_connected=True):
        self.wifi_ssid = ssid
        self.wifi_password = password
        say('Connecting to WiFi...')
        self.station = network.WLAN(network.STA_IF)
        if self.station.active():
            self.station.active(False)
            time.sleep_ms(500)

        for i in range(5):
            try:
                self.station.active(True)
                self.station.connect(ssid, password)
                break
            except OSError:
                self.station.active(False)
                time.sleep_ms(500)
                if i == 4:
                    say('Failed to connect to WiFi')
                    raise Exception('Failed to connect to WiFi')

        if wait_for_connected:
            count = 0
            while self.station.isconnected() == False:
                count = count + 1
                if count > 150:
                    say('Failed to connect to WiFi')
                    raise Exception('Failed to connect to WiFi')
                time.sleep_ms(100)

            say('Wifi connected. IP:' + self.station.ifconfig()[0])

    def wifi_connected(self):
        return self.station.isconnected()


wifi = WIFI()
