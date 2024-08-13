// Object to keep track of the number of consecutive zero readings for each sensor
let zeroCount = {
    humidity: 0,
    temperature: 0,
    gas: 0, 
    light: 0,
    soil: 0,
    ultrasonic: 0
};

// Number of cycles with continuous zero values required to trigger an alert
let maxZeroCycles = 3;

/**
 * Updates the charts and performs checks based on the provided sensor data.
 * 
 * @param {Object} data - An object containing sensor data and timestamp.
 * @param {number} data.humidity - The humidity reading.
 * @param {number} data.temperature - The temperature reading.
 * @param {number} data.gas - The gas level reading.
 * @param {number} data.light - The light intensity reading.
 * @param {number} data.soil - The soil moisture reading.
 * @param {number} data.ultrasonic - The ultrasonic distance reading.
 * @param {string} data.timestamp - The timestamp when the data was recorded.
 */
let drawChart = function (data) {
    let { humidity, temperature, gas, light, soil, ultrasonic, timestamp } = data;

    console.log(data);

    // Append the new data to the corresponding arrays
    humArr.push(Number(humidity));
    tempArr.push(Number(temperature));
    gasArr.push(Number(gas));
    lightArr.push(Number(light));
    soilArr.push(Number(soil));
    ultraArr.push(Number(ultrasonic));
    timeArr.push(timestamp);  // Assuming timestamp is a string in ISO format or similar

    // Update the charts with new data
    myChart1.series[0].setData(humArr, true);
    myChart1.series[1].setData(tempArr, true);
    myChart1.xAxis[0].setCategories(timeArr, true);

    myChart2.series[0].setData(gasArr, true);
    myChart2.xAxis[0].setCategories(timeArr, true);

    myChart3.series[0].setData(lightArr, true);
    myChart3.xAxis[0].setCategories(timeArr, true);

    myChart4.series[0].setData(soilArr, true);
    myChart4.xAxis[0].setCategories(timeArr, true);

    myChart5.series[0].setData(ultraArr, true);
    myChart5.xAxis[0].setCategories(timeArr, true);

    // Update statistics and check for alerts
    displayStats();
    checkAlerts(humidity, temperature, gas, light, soil, ultrasonic);
    checkConnection(humidity, temperature, gas, light, soil, ultrasonic);
}
