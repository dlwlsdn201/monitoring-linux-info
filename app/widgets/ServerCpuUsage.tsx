import React from 'react';
import MODULE_CardUI from '../shared/Card';

const ServerCpuUsage = () => {
  return (
    <MODULE_CardUI
      title="CPU Usage"
      status={{
        value: <span className="text-4xl font-bold">68</span>,
        unit: '%',
      }}
      // bodyContent={<LineChart className="aspect-[4/3]" />}
    />
  );
};

export default ServerCpuUsage;
