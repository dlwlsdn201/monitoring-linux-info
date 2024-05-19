import { ResponsiveBarChart } from 'client/app/dashboard/ui/BarChart';
import { useEffect, useState } from 'react';
import MODULE_CardUI from 'client/app/shared/Card';
import { serverName } from 'client/app/shared/config';
import { chartColors, chartKeys } from '../model/chart';

interface initialDiskStatusState {
  cpuUsageRate: number;
  timestamp: string | undefined;
}

export const ServerCpuStatus = () => {
  const [serverCpuStatus, setServerCpuStatus] =
    useState<initialDiskStatusState>({
      cpuUsageRate: 0,
      timestamp: undefined,
    });

  const percentData = {
    usage: serverCpuStatus.cpuUsageRate,
  };

  const chartData = {
    usage: [
      {
        server: serverName,
        used: serverCpuStatus.cpuUsageRate,
      },
    ],
  };

  const usageChart = (
    <ResponsiveBarChart
      data={chartData.usage}
      keys={chartKeys.usage}
      colors={chartColors.usage}
      maxValue={100}
    />
  );

  return (
    <MODULE_CardUI
      title="CPU 사용량"
      status={{
        value: <span className="text-4xl font-bold">{percentData.usage}</span>,
        unit: '%',
      }}
      bodyContent={usageChart}
      // bodyContent={<LineChart className="aspect-[4/3]" />}
    />
  );
};
