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

// MQTT setup
const client = mqtt.connect('ws://localhost:9001');  // Change the URL if necessary

client.on('connect', function () {
    console.log('Connected to MQTT broker');
    client.subscribe('sensor/data');
});

client.on('message', function (topic, message) {
    if (topic === 'sensor/data') {
        // Replace None with null
        let messageStr = message.toString();
        messageStr = messageStr.replace(/None/g, 'null');
        
        let data;
        try {
            data = JSON.parse(messageStr);
            console.log('data', data);
            // Implement any server-side processing if necessary
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
        }
    }
});

// Endpoint to trigger buzzer
app.post('/trigger-buzzer', (req, res) => { // Changed to POST for better practice
    try {
        triggerBuzzer();
        // console.log("server me execute hua ye");
        res.json({ status: 'Buzzer triggered' });
    } catch (error) {
        res.status(500).json({ status: 'Error triggering buzzer', error: error.message });
    }
});

// Endpoint to control LED
app.post('/control-led', (req, res) => {
    const { pin, duration } = req.body;
    try {
        controlLED(pin, duration);
        res.json({ status: 'LED control triggered' });
    } catch (error) {
        res.status(500).json({ status: 'Error controlling LED', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
