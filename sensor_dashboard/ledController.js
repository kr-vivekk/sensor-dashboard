const { spawn } = require('child_process');
const { join } = require('path');

/**
 * Controls an LED by triggering a Python script.
 *
 * @param {number} pin - The GPIO pin number where the LED is connected.
 * @param {number} duration - The duration in seconds for which the LED should stay on.
 */
const controlLED = (pin, duration) => {
    // Create a JSON string with the pin and duration information
    const data = JSON.stringify({ pin, duration });

    // Construct the full path to the Python script
    const pythonScriptPath = join(__dirname, 'scripts', 'led.py');

    // Spawn a new Python process to execute the script
    const pythonProcess = spawn('python3', [pythonScriptPath, data]);

    // Handle the standard output from the Python script
    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    // Handle any errors or standard error output from the Python script
    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    // Handle the event when the Python script process closes
    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
};

module.exports = { controlLED };
