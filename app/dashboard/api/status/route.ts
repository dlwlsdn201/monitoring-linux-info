// pages/api/status.js
import { exec } from 'child_process'; // 리눅스 시스템 명령을 비동기적으로 실행시켜줌
import { promisify } from 'util';
import { NextResponse } from 'next/server';
import { parseDiskData } from '../../model/handlers';
import dotenv from 'dotenv';
import dayjs from 'dayjs';
// const si = require('systeminformation');
dotenv.config();

const FILE_SYSTEM = process.env.TARGET_FILE_SYSTEM || '';

// 가용 용량을 확인하는 명령어
const diskCommand = 'df -h';
// 'df -h | awk \'$NF=="/"{printf "%d/%dGB (%s)\n", $3,$2,$5}\'';

// CPU 사용량을 확인하는 명령어
// const cpuCommand = 'top';

const execPromise = promisify(exec);

// 'awk \'/^cpu /{usage=(\\$2+\\$4)*100/(\\$2+\\$4+\\$5)} END {print usage "%"}\' /proc/stat';

async function runCommand(command: string): Promise<string> {
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      console.error('Error in command execution:', stderr);
      return '';
    }
    return stdout.toString().trim();
  } catch (error) {
    console.error('Error executing command:', command, error);
    return '';
  }
}

// // CPU 사용률을 확인하는 함수
// async function checkCpuUsage() {
//   si.currentLoad()
//     .then((data) => {
//       // CPU의 총 사용률을 퍼센트로 계산
//       const totalLoad = data.currentLoad.toFixed(2);
//       console.log(`현재 CPU 사용률: ${totalLoad}%`);

//       // 각 CPU 코어의 사용률을 출력
//       data.cpus.forEach((cpu, index) => {
//         console.log(`CPU ${index + 1}: ${cpu.load.toFixed(2)}%`);
//       });
//     })
//     .catch((error) => {
//       console.error('CPU 정보를 읽는데 실패했습니다:', error);
//     });
// }

export async function GET(): Promise<NextResponse> {
  try {
    // const { stdout: cpu } = await execPromise('top -bn1 | grep "Cpu(s)"');
    // const { stdout: memory } = await execPromise('free -m');
    // const { stdout: disk } = await execPromise('df -h');
    const disk = await runCommand(diskCommand);
    // const cpu = await runCommand(cpuCommand);

    const serverStatusRequests = Promise.all([disk]);

    // // 로깅을 추가하여 결과를 확인
    const [
      diskStatus,
      // cpuStatus
    ] = await serverStatusRequests;

    const formattedDiskData = parseDiskData(diskStatus, FILE_SYSTEM);
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm');

    // const cpuData = cpuStatus;

    return NextResponse.json(
      {
        payload: {
          diskStatus: formattedDiskData,
          // cpuStatus
        },
        timestamp,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
