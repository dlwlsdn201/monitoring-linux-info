'use client';
import dotenv from 'dotenv';
dotenv.config();

// import { Avatar, Button } from '@nextui-org/react';
// import MODULE_CardUI from '../../shared/Card';
import ServerDiskUsageStatusWidget from 'client/app/widgets/dashboard/ServerDiskUsageStatusWidget';
// import { getServerDiskStatusData } from '../api/status/functions';

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 grid gap-6">
        <div className="grid grid-cols-1 gap-6 min-h-[85vh] max-h-[85vh]">
          {/* 모든 서버 상태 */}
          {/* <TotalServerInfo /> */}
          {/* CPU */}
          {/* <ServerCpuUsage/> */}
          {/* Memory */}
          {/* <ServerMomoryUsage/> */}
          {/* 디스크 용량 */}
          <ServerDiskUsageStatusWidget />
        </div>
      </main>
    </div>
  );
}
