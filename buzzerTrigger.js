// import { spawn } from "child_process";
// import { join } from 'path';

// const triggerBuzzer = () => {
//     const pythonScriptPath = join(__dirname, 'scripts', 'buzzer.py');
//     const pythonProcess = spawn('python3', [pythonScriptPath]);

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

// export default { triggerBuzzer };
const { exec } = require('child_process');
const { join } = require('path');

const triggerBuzzer = () => {
    const pythonScriptPath = join(__dirname, 'scripts', 'buzzer.py');
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
