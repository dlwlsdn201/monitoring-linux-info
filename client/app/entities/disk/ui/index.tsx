import { ResponsiveBarChart } from 'client/app/dashboard/ui/BarChart';
import { useEffect, useRef, useState } from 'react';
import MODULE_CardUI from 'client/app/shared/Card';
import { chartColors, chartKeys } from '../model/chart';
import { diskChartData } from '../lib/handlers';
import { serverName } from 'client/app/shared/config';
import { useData } from '../lib/useData';

interface initialDiskStatusState {
  size: number | '';
  used: number | '';
  avail: number | '';
  capacity: number | '';
  filesystem: string;
  timestamp: string | undefined;
}

export const ServerDiskStatus = () => {
  const [serverDiskStatus, setServerDiskStatus] =
    useState<initialDiskStatusState>({
      size: 0,
      used: 0,
      avail: 0,
      capacity: 0,
      filesystem: '',
      timestamp: '',
    });

  const updateStateForChartData = (formattedDiskData: {
    size: number | '';
    used: number | '';
    avail: number | '';
    capacity: number | '';
    filesystem: string;
  }) => {
    setServerDiskStatus({
      ...serverDiskStatus,
      size: formattedDiskData?.size,
      used: formattedDiskData?.used,
      avail: formattedDiskData?.avail,
      capacity: formattedDiskData?.capacity,
      filesystem: formattedDiskData?.filesystem,
    });
  };

  const percentData = {
    usage: serverDiskStatus.capacity,
  };

  const chartData = {
    usage: [
      {
        server: serverName,
        avail: serverDiskStatus.avail,
        used: serverDiskStatus.used,
      },
    ],
  };

  const usageChart = (
    <ResponsiveBarChart
      data={chartData.usage}
      keys={chartKeys.usage}
      colors={chartColors.usage}
      maxValue={
        Number.isInteger(serverDiskStatus?.size)
          ? (serverDiskStatus?.size as number)
          : undefined
      }
    />
  );

  const initRender = useRef(true);

  useEffect(() => {
    if (initRender) {
      useData()
        .then(({ data }) => {
          const formattedRawDiskData = diskChartData(data?.payload);
          updateStateForChartData(formattedRawDiskData);
        })
        .catch((reason) => {
          console.error(reason);
        });
      initRender.current = false;
    }
  }, []);

  return (
    <MODULE_CardUI
      title="디스크 사용량"
      status={{
        value: <span className="text-4xl font-bold">{percentData?.usage}</span>,
        unit: '%',
      }}
      bodyContent={usageChart}
      // bodyContent={<LineChart className="aspect-[4/3]" />}
    />
  );
};
