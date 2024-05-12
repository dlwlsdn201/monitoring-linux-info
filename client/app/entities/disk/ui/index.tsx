import { diskChartData } from 'client/app/dashboard/model/handlers';
import { ResponsiveBarChart } from 'client/app/dashboard/ui/BarChart';
import { useEffect, useState } from 'react';
import { fetchDiskStatus } from '../api';
import MODULE_CardUI from 'client/app/shared/Card';

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

  const initServerDiskStatus = (formattedDiskData: {
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

  const serverName = process.env.NEXT_PUBLIC_TARGET_SERVER_NAME || '';
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

  const chartKeys: {
    [key: string]: string[];
  } = {
    usage: ['avail', 'used'],
  };

  const chartColors = {
    usage: {
      avail: '#51b811',
      used: '#eb5228',
    },
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

  const fetchData = async () => {
    try {
      const { data, isError, error } = await fetchDiskStatus();

      return data;
    } catch (error) {
      throw Error();
    }
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        const formattedRawDiskData = diskChartData(data?.payload);
        initServerDiskStatus(formattedRawDiskData);
      })
      .catch((reason) => {
        console.error(reason);
      });
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
