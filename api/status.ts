// pages/api/status.js
import { exec } from 'child_process'; // 리눅스 시스템 명령을 비동기적으로 실행시켜줌
import { promisify } from 'util';
import type { NextApiRequest, NextApiResponse } from 'next';
const execPromise = promisify(exec);

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { stdout: cpu } = await execPromise('top -bn1 | grep "Cpu(s)"');
    const { stdout: memory } = await execPromise('free -m');
    const { stdout: disk } = await execPromise('df -h');

    res.status(200).json({ cpu, memory, disk });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default handler;
