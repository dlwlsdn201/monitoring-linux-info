import { ResponsiveBarChart } from 'client/app/dashboard/ui/BarChart';
import { useEffect, useState } from 'react';
import MODULE_CardUI from 'client/app/shared/Card';
import { serverName } from 'client/app/shared/config';
import { chartColors, chartKeys } from '../model/chart';
import { useCpuData } from '../lib/useCpuData';

interface initialDiskStatusState {
  totalCpuUsageRate: number;
  topProcesses: any[];
  timestamp: string | undefined;
}

export const ServerCpuStatus = () => {
  const [serverCpuStatus, setServerCpuStatus] =
    useState<initialDiskStatusState>({
      totalCpuUsageRate: 0,
      topProcesses: [],
      timestamp: undefined,
    });

  const percentData = {
    usage: serverCpuStatus.totalCpuUsageRate,
  };

  const chartData = {
    usage: [
      {
        server: serverName,
        used: serverCpuStatus.totalCpuUsageRate,
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

  useEffect(() => {
    useCpuData()
      .then(({ data, error }) => {
        if (data && !error) {
          const updateState = {
            totalCpuUsageRate: data?.payload?.totalCpuUsageRate,
            topProcesses: data?.payload?.topProcesses,
            timestamp: data?.timestamp,
          };
          setServerCpuStatus(updateState);
        }
      })
      .catch(({ error }) => {
        console.error(error);
      });
  }, []);
  console.log({ serverCpuStatus });
  return (
    <MODULE_CardUI
      title="CPU 사용량"
      timestamp={serverCpuStatus.timestamp}
      status={{
        value: percentData.usage,
        unit: '%',
      }}
      bodyContent={usageChart}
      // bodyContent={<LineChart className="aspect-[4/3]" />}
    />
  );
};
