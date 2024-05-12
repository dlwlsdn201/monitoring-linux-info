import os from "os";

export const calculateCpuUsage = async () => {
  let result;
  const cpus = os.cpus();
  let totalIdle = 0,
    totalTick = 0;
  cpus.forEach((cpu) => {
    Object.values(cpu.times).forEach((time) => {
      totalTick += time;
    });
    totalIdle += cpu.times.idle;
  });
  const totalUsage = (1 - totalIdle / totalTick) * 100;
  result = parseFloat(totalUsage.toFixed(2));
  return result;
};
