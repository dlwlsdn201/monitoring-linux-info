import React from 'react';
import MODULE_CardUI from '../shared/Card';

interface Props {
  usageRate: number | string;
  chartContent: React.ReactNode;
}

const ServerDiskSpaceUsage = ({ usageRate, chartContent }: Props) => {
  return (
    <MODULE_CardUI
      title="디스크 사용량"
      status={{
        value: <span className="text-4xl font-bold">{usageRate}</span>,
        unit: '%',
      }}
      bodyContent={chartContent}
      // bodyContent={<LineChart className="aspect-[4/3]" />}
    />
  );
};

export default ServerDiskSpaceUsage;
