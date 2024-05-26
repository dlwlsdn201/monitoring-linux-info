import React from 'react';
import MODULE_CardUI from '../shared/Card';

const ServerMemoryUsage = () => {
  return (
    <MODULE_CardUI
      title="Memory Usage"
      status={{
        value: <span className="text-4xl font-bold">82</span>,
        unit: '%',
      }}
      // bodyContent={<LineChart className="aspect-[4/3]" />}
    />
  );
};

export default ServerMemoryUsage;
