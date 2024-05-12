const express = require("express");
const { exec } = require("child_process");
const { promisify } = require("util");
const dotenv = require("dotenv");
const dayjs = require("dayjs");
const { parseDiskData } = require("./src/lib/handler");
// const si = require('systeminformation'); // Uncomment if systeminformation is needed

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const FILE_SYSTEM = process.env.TARGET_FILE_SYSTEM || "";

const diskCommand = "df -h";

const execPromise = promisify(exec);

async function runCommand(command) {
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      console.error("Error in command execution:", stderr);
      return "";
    }
    return stdout.toString().trim();
  } catch (error) {
    console.error("Error executing command:", command, error);
    return "";
  }
}

// 서버의 물리 디스크 사용 현황 제공 API
app.get("/api/status/disk", async (req, res) => {
  try {
    console.group("Requested by:", req.url);
    const disk = await runCommand(diskCommand);

    const [diskStatus] = await Promise.all([disk]);
    const formattedDiskData = parseDiskData(diskStatus, FILE_SYSTEM);
    const timestamp = dayjs().format("YYYY-MM-DD HH:mm");

    const responseData = {
      payload: {
        diskStatus: formattedDiskData,
      },
      timestamp,
    };

    console.group("[[RESPONSE DATA]]");
    console.log("[payload]:", diskStatus);
    console.log("[timestamp]:", timestamp);
    console.groupEnd();
    res.status(200).json(responseData);

    console.groupEnd();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
