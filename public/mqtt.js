let client = mqtt.connect('ws://localhost:9001');  // Change the URL if necessary

client.on('connect', function () {
    console.log('Connected to MQTT broker');
    client.subscribe('sensor/data');
});

client.on('message', function (topic, message) {
    if (topic === 'sensor/data') {
        let data = JSON.parse(message.toString());
        // console.log('data', data);
        drawChart(data);
    }
});
