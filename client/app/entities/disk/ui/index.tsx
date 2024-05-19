import { useEffect, useState } from 'react';
import MODULE_CardUI from 'client/app/shared/Card';
import {
  UNIT_DISK,
  Y_AXIS_LABEL,
  chartColors,
  chartKeys,
} from '../model/chart';
import { diskChartData } from '../lib/handlers';
import { serverName } from 'client/app/shared/config';
import { useData } from '../lib/useData';
import { refreshInterval } from '../model/refresh';
import { useRefetch } from 'client/app/shared/hooks/refetch';
import { BarChart } from 'client/app/shared/ui/chart';

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

  const updateStateForChartData = ({
    formattedDiskData,
    timestamp,
  }: {
    formattedDiskData: {
      size: number | '';
      used: number | '';
      avail: number | '';
      capacity: number | '';
      filesystem: string;
    };
    timestamp: string;
  }) => {
    setServerDiskStatus({
      ...serverDiskStatus,
      size: formattedDiskData?.size,
      used: formattedDiskData?.used,
      avail: formattedDiskData?.avail,
      capacity: formattedDiskData?.capacity,
      filesystem: formattedDiskData?.filesystem,
      timestamp,
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
    <BarChart
      unit={UNIT_DISK}
      yAxisLabel={Y_AXIS_LABEL}
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

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await useData();
      try {
        if (data && !error) {
          const formattedRawDiskData = diskChartData(data?.payload);
          updateStateForChartData({
            formattedDiskData: formattedRawDiskData,
            timestamp: data.timestamp,
          });
        } else {
          throw Error();
        }
      } catch (error) {
        console.error(error);
      }
    };

    // data fetch 주기 설정
    useRefetch(fetchData, refreshInterval);
  }, []);

  useEffect;

  return (
    <MODULE_CardUI
      title="디스크 사용량"
      timestamp={serverDiskStatus.timestamp}
      status={{
        value: percentData?.usage,
        unit: '%',
      }}
      bodyContent={usageChart}
      // bodyContent={<LineChart className="aspect-[4/3]" />}
    />
  );
};
