import { calculateCpuUsage } from "./lib/calculateCpuUsage";
import { getTop5CpuProcesses } from "./lib/getTop5Processes";

export const requestCpuStatusAPI = async () => {
  try {
    // CPU 사용량을 저장할 변수

    const totalCpuUsageRate = await calculateCpuUsage();
    const topProcesses = await getTop5CpuProcesses();
    const result = {
      payload: {
        totalCpuUsageRate,
        topProcesses,
      },
    };
    console.log({ result });
    return result;

    // 5초마다 CPU 사용량 갱신
    // setInterval(calculateCpuUsage, 5000);
  } catch (error) {
    throw Error();
  }
};
