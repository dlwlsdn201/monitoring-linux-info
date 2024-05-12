import { excuteLinuxCommand, parseDiskData } from "../../lib/handler";
import dayjs from "dayjs";
import dotenv from "dotenv";

// ==== Configs ====
dotenv.config();

const diskCommand = "df -h";

const FILE_SYSTEM = process.env.TARGET_FILE_SYSTEM;

// ==== Function ====
const requestDiskStatusAPI = async () => {
  try {
    // console.group("Requested by:", req);
    console.group("[[RESPONSE DATA]]");
    const disk = await excuteLinuxCommand(diskCommand);

    const [diskStatus] = await Promise.all([disk]);
    const formattedDiskData = parseDiskData(diskStatus, FILE_SYSTEM);
    const timestamp = dayjs().format("YYYY-MM-DD HH:mm");

    const responseData = {
      payload: {
        diskStatus: formattedDiskData,
      },
      timestamp,
    };
    console.log("[payload]:", diskStatus);
    console.log("[timestamp]:", timestamp);
    console.log("[diskStatus]:", diskStatus);

    console.groupEnd();
    return responseData;
  } catch (error) {
    throw Error();
  }
};

export default requestDiskStatusAPI;
