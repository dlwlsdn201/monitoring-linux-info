exports.parseDiskData = (rawData, diskName) => {
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
