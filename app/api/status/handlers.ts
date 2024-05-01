export const parseDiskData = (rawData, diskName) => {
  const lines: string[] = rawData.trim().split('\n');
  const headers = lines.shift().split(/\s+/);
  console.log({ lines });
  const diskData = lines
    .map((line: string) => line.split(/\s+/))
    .filter((parts) => parts[0] === diskName)
    .map((parts) => {
      let diskInfo = {};
      headers.forEach((header, index) => {
        diskInfo[header.toLowerCase()] = parts[index];
      });
      return diskInfo;
    });

  if (diskData.length > 0) {
    return diskData[0];
  } else {
    throw new Error(`No disk found with the name '${diskName}'`);
  }
};
