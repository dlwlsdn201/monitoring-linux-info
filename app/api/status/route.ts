// pages/api/status.js
import { exec } from 'child_process'; // 리눅스 시스템 명령을 비동기적으로 실행시켜줌
import { promisify } from 'util';
import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { parseDiskData } from './handlers';
import dotenv from 'dotenv';
// const si = require('systeminformation');
dotenv.config();
const execPromise = promisify(exec);

// 가용 용량을 확인하는 명령어
const diskCommand = 'df -h';
// 'df -h | awk \'$NF=="/"{printf "%d/%dGB (%s)\n", $3,$2,$5}\'';

// CPU 사용량을 확인하는 명령어
const cpuCommand = 'top';
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

export async function GET(req: NextApiRequest): Promise<NextResponse> {
  try {
    // const { stdout: cpu } = await execPromise('top -bn1 | grep "Cpu(s)"');
    // const { stdout: memory } = await execPromise('free -m');
    // const { stdout: disk } = await execPromise('df -h');
    const disk = await runCommand(diskCommand);
    const cpu = await runCommand(cpuCommand);

    // await checkCpuUsage();

    // 로깅을 추가하여 결과를 확인
    const rawDiskData = disk;
    const FILE_SYSTEM = process.env.TARGET_FILE_SYSTEM;
    const formattedDiskData = parseDiskData(rawDiskData, FILE_SYSTEM);
    console.log('FormattedDiskData:', formattedDiskData);
    console.log('날짜:', new Date());
    // console.log('Disk:', disk);
    // console.log('Cpu:', cpu);

    return NextResponse.json({ disk }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
