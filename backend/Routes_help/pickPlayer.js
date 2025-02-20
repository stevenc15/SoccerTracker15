const { spawn } = require('child_process'); // Import the spawn function from the child_process module to execute Python scripts in a child process
const path = require('path');

let wsClient=null;

const setWsClient = (client) => {
    wsClient=client
};

// Function to process the video, running a Python script and returning a promise for asynchronous handling
const pick_p = (inputP, outputP) => { 
    return new Promise((resolve, reject) => { // Return a new promise for handling success or failure
        
        // Spawn a new child process to run the Python script
        //const pythonPath = path.resolve(__dirname, './virtual_e/bin/python3.11'); // Absolute path to the Python interpreter
        //const scriptPath = path.resolve(__dirname, '../ML/pick_player.py'); // Absolute path to the Python script
        const pythonPath = "/app/Routes_help/virtual_e/lib/python3.11";
        const scriptPath = "/app/ML/pick_player.py";
        const process = spawn(pythonPath, [scriptPath, inputP, outputP]); // Run the Python interpreter, passing the path to the Python script and the input/output parameters


        // Listen to the 'data' event on stdout, which is the standard output stream from the Python script
        process.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`); // Log the data (output) from the Python script

        });

        // Listen to the 'data' event on stderr, which is the error stream in case the Python script produces errors
        process.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`); // Log any errors or warnings produced by the Python script
        });

        // Listen to the 'close' event, which occurs when the child process exits
        process.on('close', (code) => { 
            if (code !== 0) { // If the exit code is not 0 (indicating an error occurred)
                reject(`Process exited with code: ${code}`); // Reject the promise and provide the error code
            } else {
                /*
                if (wsClient) {
                    wsClient.send(JSON.stringify({ message: "Processing complete" }));
                }
                    */
                resolve(); // If the process completes successfully, resolve the promise
            }
        });
    });
};

module.exports =  {pick_p} ; // Export the processVideo function to be used in other parts of the application
