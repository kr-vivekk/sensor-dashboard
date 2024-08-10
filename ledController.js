// import { spawn } from 'child_process';
// import { join } from 'path';

// const controlLED = (pin, duration) => {
//     const data = JSON.stringify({ pin, duration });
//     const pythonScriptPath = join(__dirname, 'scripts', 'led.py');
//     const pythonProcess = spawn('python3', [pythonScriptPath, data]);

//     pythonProcess.stdout.on('data', (data) => {
//         console.log(`stdout: ${data}`);
//     });

//     pythonProcess.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//     });

//     pythonProcess.on('close', (code) => {
//         console.log(`child process exited with code ${code}`);
//     });
// };

// export default { controlLED };

const { spawn } = require('child_process');
const { join } = require('path');

const controlLED = (pin, duration) => {
    const data = JSON.stringify({ pin, duration });
    const pythonScriptPath = join(__dirname, 'scripts', 'led.py');
    const pythonProcess = spawn('python3', [pythonScriptPath, data]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
};

module.exports = { controlLED };
