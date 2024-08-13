// Connect to the MQTT broker
let client = mqtt.connect('ws://localhost:9001');  // Change the URL if necessary

// Event handler for when the client successfully connects to the MQTT broker
client.on('connect', function () {
    console.log('Connected to MQTT broker');
    // Subscribe to the 'sensor/data' topic to receive messages
    client.subscribe('sensor/data');
});

// Event handler for when a message is received from the MQTT broker
client.on('message', function (topic, message) {
    // Check if the message is from the 'sensor/data' topic
    if (topic === 'sensor/data') {
        // Parse the incoming message as JSON
        let data = JSON.parse(message.toString());
        // Update the charts with the new data
        drawChart(data);
    }
});
