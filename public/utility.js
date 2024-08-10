let displayStats = function () {
    let humStats = calculateStats(humArr);
    let tempStats = calculateStats(tempArr);
    let gasStats = calculateStats(gasArr);
    let lightStats = calculateStats(lightArr);
    let soilStats = calculateStats(soilArr);
    let ultraStats = calculateStats(ultraArr);

    $('#humidity-stats').html(`Min: ${humStats.min}, Max: ${humStats.max}, Avg: ${humStats.avg.toFixed(2)}`);
    $('#temperature-stats').html(`Min: ${tempStats.min}, Max: ${tempStats.max}, Avg: ${tempStats.avg.toFixed(2)}`);
    $('#gas-stats').html(`Min: ${gasStats.min}, Max: ${gasStats.max}, Avg: ${gasStats.avg.toFixed(2)}`);
    $('#light-stats').html(`Min: ${lightStats.min}, Max: ${lightStats.max}, Avg: ${lightStats.avg.toFixed(2)}`);
    $('#soil-stats').html(`Min: ${soilStats.min}, Max: ${soilStats.max}, Avg: ${soilStats.avg.toFixed(2)}`);
    $('#ultra-stats').html(`Min: ${ultraStats.min}, Max: ${ultraStats.max}, Avg: ${ultraStats.avg.toFixed(2)}`);
}

let calculateStats = function (arr) {
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let sum = arr.reduce((a, b) => a + b, 0);
    let avg = sum / arr.length;
    return { min, max, avg };
}
let triggerBuzzer = function () {
    fetch('/trigger-buzzer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Buzzer triggered:', data);
    })
    .catch(error => {
        console.error('Error triggering buzzer:', error);
    });
}

let controlLED = function(pin, duration) {
    fetch('/control-led', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pin, duration })
    })
    .then(response => response.json())
    .then(data => {
        console.log('LED control triggered:', data);
    })
    .catch(error => {
        console.error('Error controlling LED:', error);
    });
};

let checkAlerts = function (humidity, temperature, gas, light, soil, ultrasonic) {
    if (temperature > 50) {
        
        triggerBuzzer();
        controlLED(15, 1);
        alert('Temperature is above 50°C!');
    } else if (temperature < 0) {
        
        triggerBuzzer();
        controlLED(15, 1);
        alert('Temperature is below 0°C!');
    }

    if (humidity < 20) {
        
        triggerBuzzer();
        controlLED(15, 1);
        alert('Humidity is below 20%!');
    } else if (humidity > 90) {
        
        triggerBuzzer();
        controlLED(15, 1);
        alert('Humidity is above 90%!');
    }

    if (gas > 10000) {
        
        triggerBuzzer();
        controlLED(12, 1);
        alert('Gas lsensor value beyond threshold!');
    }

    if (light != 0 && light != 1) {
        
        triggerBuzzer();
        controlLED(3, 1);
        alert('Light sensor is not working properly!');
    }

    if (soil <= 0 || soil > 1023) {
        
        triggerBuzzer();
        controlLED(5, 1);
        alert('Soil moisture is beyond range of the sensor!');
    }

    if (ultrasonic > 400 || ultrasonic < 20) {
        alert('Ultrasonic sensor reading is beyond the range of sensor');
    }
}

let checkConnection = function (humidity, temperature, gas, light, soilMoisture, ultrasonic) {
    if (humidity === 0) {
        zeroCount.humidity++;
    } else {
        zeroCount.humidity = 0;
    }

    if (temperature === 0) {
        zeroCount.temperature++;
    } else {
        zeroCount.temperature = 0;
    }

    if (gas === 0) {
        zeroCount.gas++;
    } else {
        zeroCount.gas = 0;
    }

    if (light === 1) {
        zeroCount.light++;
    } else {
        zeroCount.light = 0;
    }

    if (soilMoisture === 0) {
        zeroCount.soilMoisture++;
    } else {
        zeroCount.soilMoisture = 0;
    }

    if (ultrasonic === 0) {
        zeroCount.ultrasonic++;
    } else {
        zeroCount.ultrasonic = 0;
    }

    if (zeroCount.humidity >= maxZeroCycles && zeroCount.temperature < maxZeroCycles && zeroCount.gas < maxZeroCycles && zeroCount.light < maxZeroCycles && zeroCount.soilMoisture < maxZeroCycles && zeroCount.ultrasonic < maxZeroCycles) {
        alert('Connection check required for Humidity sensor');
    }

    if (zeroCount.temperature >= maxZeroCycles && zeroCount.humidity < maxZeroCycles && zeroCount.gas < maxZeroCycles && zeroCount.light < maxZeroCycles && zeroCount.soilMoisture < maxZeroCycles && zeroCount.ultrasonic < maxZeroCycles) {
        alert('Connection check required for Temperature sensor');
    }

    if (zeroCount.gas >= maxZeroCycles && zeroCount.humidity < maxZeroCycles && zeroCount.temperature < maxZeroCycles && zeroCount.light < maxZeroCycles && zeroCount.soilMoisture < maxZeroCycles && zeroCount.ultrasonic < maxZeroCycles) {
        alert('Connection check required for Gas sensor');
    }

     if (zeroCount.light >= maxZeroCycles && zeroCount.humidity < maxZeroCycles && zeroCount.temperature < maxZeroCycles && zeroCount.gas < maxZeroCycles && zeroCount.soilMoisture < maxZeroCycles && zeroCount.ultrasonic < maxZeroCycles) {
         alert('Connection check required for Light sensor');
    }

    if (zeroCount.soilMoisture >= maxZeroCycles && zeroCount.humidity < maxZeroCycles && zeroCount.temperature < maxZeroCycles && zeroCount.gas < maxZeroCycles && zeroCount.light < maxZeroCycles && zeroCount.ultrasonic < maxZeroCycles) {
        alert('Connection check required for Soil Moisture sensor');
    }

    if (zeroCount.ultrasonic >= maxZeroCycles && zeroCount.humidity < maxZeroCycles && zeroCount.temperature < maxZeroCycles && zeroCount.gas < maxZeroCycles && zeroCount.light < maxZeroCycles && zeroCount.soilMoisture < maxZeroCycles) {
        alert('Connection check required for Ultrasonic sensor');
    }
}
