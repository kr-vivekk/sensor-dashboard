const express = require('express');
const mqtt = require('mqtt');
const path = require('path');
const { triggerBuzzer } = require('./buzzerTrigger.js');
const { controlLED } = require('./ledController.js');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// MQTT setup and connection to broker
const client = mqtt.connect('ws://localhost:9001');  // Adjust the URL if needed

client.on('connect', function () {
    console.log('Connected to MQTT broker');
    client.subscribe('sensor/data');  // Subscribe to sensor data topic
});

// Handle incoming MQTT messages
client.on('message', function (topic, message) {
    if (topic === 'sensor/data') {
        let messageStr = message.toString();

        // Replace 'None' with 'null' for JSON parsing compatibility
        messageStr = messageStr.replace(/None/g, 'null');
        
        try {
            const data = JSON.parse(messageStr);
            console.log('Received data:', data);
            // Additional server-side processing can be added here if needed
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
        }
    }
});

// Endpoint to trigger the buzzer
app.post('/trigger-buzzer', (req, res) => {
    try {
        triggerBuzzer();  // Call function to trigger the buzzer
        res.json({ status: 'Buzzer triggered' });
    } catch (error) {
        res.status(500).json({ status: 'Error triggering buzzer', error: error.message });
    }
});

// Endpoint to control an LED
app.post('/control-led', (req, res) => {
    const { pin, duration } = req.body;
    try {
        controlLED(pin, duration);  // Call function to control the LED
        res.json({ status: 'LED control triggered' });
    } catch (error) {
        res.status(500).json({ status: 'Error controlling LED', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
