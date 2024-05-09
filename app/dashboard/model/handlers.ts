import { ServerDiskStatusProps } from '../../../types/server';

export const parseDiskData = (rawData: string, diskName: string) => {
  const lines: string[] = rawData.trim().split('\n');
  if (lines && lines.length > 0) {
    const shiftedLines: string | undefined = lines.shift();
    const headers = shiftedLines && shiftedLines.split(/\s+/);
    const diskData = lines
      .map((line: string) => line.split(/\s+/))
      .filter((parts) => parts[0] === diskName)
      .map((parts) => {
        let diskInfo: any = new Object();
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

export const formatToNumber = (stringData: string) =>
  stringData &&
  Number(
    stringData
      .split('')
      .filter((str) => !Number.isNaN(Number(str)))
      .join('')
  );

export const diskChartData = (resData: ServerDiskStatusProps) => {
  const { size, used, avail, capacity, filesystem } = resData || [];
  const formattedSizeData = formatToNumber(size);
  const formattedUsedData = formatToNumber(used);
  const formattedAvailData = formatToNumber(avail);
  const formattedCapacityData = formatToNumber(capacity);

  const result = {
    size: formattedSizeData,
    used: formattedUsedData,
    avail: formattedAvailData,
    capacity: formattedCapacityData,
    filesystem,
  };

  return result;
};
