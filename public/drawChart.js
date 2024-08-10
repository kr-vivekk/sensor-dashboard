let zeroCount = {
    humidity: 0,
    temperature: 0,
    gas: 0, 
    light: 0,
    soil: 0,
    ultrasonic: 0
};

let maxZeroCycles = 3;  // Number of cycles with continuous zero values to trigger the alert

let drawChart = function (data) {
    // if (!data.humidity || !data.temperature || !data.timestamp || !data.gas) {
    //     console.error("Invalid data format");
    //     return;
    // }
    

    let { humidity, temperature, gas, light, soil, ultrasonic, timestamp } = data;

    console.log(data);

    humArr.push(Number(humidity));
    tempArr.push(Number(temperature));
    gasArr.push(Number(gas));
    lightArr.push(Number(light));
    soilArr.push(Number(soil));
    ultraArr.push(Number(ultrasonic));
    timeArr.push(timestamp);  // Assuming timestamp is a string in ISO format or similar

    myChart1.series[0].setData(humArr, true);
    myChart1.series[1].setData(tempArr, true);
    myChart1.xAxis[0].setCategories(timeArr, true);

    myChart2.series[0].setData(gasArr, true);
    myChart2.xAxis[0].setCategories(timeArr, true);

    myChart3.series[0].setData(lightArr, true);
    myChart2.xAxis[0].setCategories(timeArr, true);

    myChart4.series[0].setData(soilArr, true);
    myChart2.xAxis[0].setCategories(timeArr, true);

    myChart5.series[0].setData(ultraArr, true);
    myChart2.xAxis[0].setCategories(timeArr, true);

    displayStats();
    checkAlerts(humidity, temperature, gas, light, soil, ultrasonic);
    checkConnection(humidity, temperature, gas, light, soil, ultrasonic);
}
