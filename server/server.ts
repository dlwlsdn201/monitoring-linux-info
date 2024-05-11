const express = require('express');
const { exec } = require('child_process');
const { promisify } = require('util');
const dotenv = require('dotenv');
const dayjs = require('dayjs');
// const si = require('systeminformation'); // Uncomment if systeminformation is needed
const { parseDiskData } = require('./model/handlers'); // Ensure this path is correct

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const FILE_SYSTEM = process.env.TARGET_FILE_SYSTEM || '';

const diskCommand = 'df -h';
const whichDf = 'which df';

const execPromise = promisify(exec);

async function runCommand(command) {
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      console.error('Error in command execution:', stderr);
      return '';
    }
    return stdout.toString().trim();
  } catch (error) {
    console.error('Error executing command:', command, error);
    return '';
  }
}

app.get('/api/status', async (req, res) => {
  try {
    const disk = await runCommand(diskCommand);
    const test = await runCommand(whichDf);

    const [diskStatus, testStatus] = await Promise.all([disk, test]);
    const formattedDiskData = parseDiskData(diskStatus, FILE_SYSTEM);
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm');

    res.status(200).json({
      payload: {
        diskStatus: formattedDiskData,
        testStatus,
      },
      timestamp,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
