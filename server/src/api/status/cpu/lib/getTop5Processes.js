import { exec } from "child_process";

const commandType = {
  linux: "ps -eo pcpu,pid,cmd --sort=-pcpu | head -n 6",
  mac: "ps -A -o %cpu,pid,command | sort -r -k1 | head -n 6",
};

export const getTop5CpuProcesses = async () => {
  let result = [];
  exec(commandType.mac, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    result = stdout
      .split("\n")
      .filter((line) => line)
      .slice(1) // 첫 줄은 헤더라면 제외
      .map((line) => {
        const [pcpu, pid, ...cmd] = line.trim().split(/\s+/);
        return {
          pcpu: parseFloat(pcpu).toFixed(2),
          pid,
          cmd: cmd.join(" "),
        };
      });
  });

  return result;
};
