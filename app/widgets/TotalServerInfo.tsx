import React from 'react';
import MODULE_CardUI from '../shared/Card';

/* 모든 서버에 대한 상태  */
const TotalServerInfo = () => {
  return (
    <MODULE_CardUI
      title="Total Servers"
      status={{ value: '24' }}
      bodyContent={
        <div>
          <div className="flex items-center gap-2">
            {/* <ServerIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" /> */}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Healthy: 22
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* <ServerIcon className="w-5 h-5 text-yellow-500" /> */}
            <span className="text-sm text-yellow-500">Warning: 1</span>
          </div>
          <div className="flex items-center gap-2">
            {/* <ServerIcon className="w-5 h-5 text-red-500" /> */}
            <span className="text-sm text-red-500">Error: 1</span>
          </div>
        </div>
      }
    />
  );
};

export default TotalServerInfo;
