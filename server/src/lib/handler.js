export const parseDiskData = (rawData, diskName) => {
  const lines = rawData.trim().split("\n");
  if (lines && lines.length > 0) {
    const shiftedLines = lines.shift();
    const headers = shiftedLines && shiftedLines.split(/\s+/);
    const diskData = lines
      .map((line) => line.split(/\s+/))
      .filter((parts) => parts[0] === diskName)
      .map((parts) => {
        let diskInfo = new Object();
        if (headers && headers.length > 0) {
          headers.forEach((header, index) => {
            diskInfo[header.toLowerCase()] = parts[index];
          });
        }
        return diskInfo;
      });

    if (diskData.length > 0) {
      return diskData[0];
    } else {
      throw new Error(`No disk found with the name '${diskName}'`);
    }
  } else {
    return false;
  }
};

import { exec } from "child_process";
import { promisify } from "util";

export const excuteLinuxCommand = async (command) => {
  try {
    const execPromise = promisify(exec);
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
};
