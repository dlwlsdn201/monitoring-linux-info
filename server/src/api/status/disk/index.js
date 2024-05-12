import { excuteLinuxCommand, parseDiskData } from "../../../lib/handler";
import dayjs from "dayjs";
import dotenv from "dotenv";

// ==== Configs ====
dotenv.config();

const diskCommand = "df -h";

const FILE_SYSTEM = process.env.TARGET_FILE_SYSTEM;

// ==== Function ====
export const requestDiskStatusAPI = async () => {
  try {
    const disk = await excuteLinuxCommand(diskCommand);

    const [diskStatus] = await Promise.all([disk]);
    const formattedDiskData = parseDiskData(diskStatus, FILE_SYSTEM);
    const timestamp = dayjs().format("YYYY-MM-DD HH:mm");
    const result = {
      payload: {
        diskStatus: formattedDiskData,
      },
      timestamp,
    };

    return result;
  } catch (error) {
    console.log("error:", error);
    throw Error();
  }
};
