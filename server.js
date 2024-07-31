// const express = require('express');
// const { spawn } = require('child_process');

// const app = express();

// app.get('/api/run-python-script', (req, res) => {
//   const pythonScript = spawn('python', ['./scripts/main1.py', "Free", "YouTube"]);

//   let dataToSend = '';

//   pythonScript.stdout.on('data', (data) => {
//     console.log(data)
//     dataToSend += data.toString();
//     console.log(dataToSend)
//   });

//   pythonScript.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });

//   pythonScript.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
//     res.send(dataToSend);
//   });
// });

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });
require('@babel/register')({
  extends: './.babelrc'
})
require('babel-polyfill')
require('./src')
