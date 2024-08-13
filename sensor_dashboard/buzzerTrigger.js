const { exec } = require('child_process');
const { join } = require('path');

/**
 * Triggers a buzzer by executing a Python script.
 */
const triggerBuzzer = () => {
    // Construct the full path to the Python script
    const pythonScriptPath = join(__dirname, 'scripts', 'buzzer.py');

    // Execute the Python script using the exec function
    exec(`python3 ${pythonScriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
};

module.exports = { triggerBuzzer };
