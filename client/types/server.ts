export interface commonServerStatusProps {
  payload: any;
  timestamp: string | undefined;
}

export interface ServerDiskStatusProps {
  size: string;
  used: string;
  avail: string;
  capacity: string;
  filesystem: string;
}

export interface ServerDiskStatusResponseData extends commonServerStatusProps {
  payload: ServerDiskStatusProps;
}

export interface ServerCpuResponseData extends commonServerStatusProps {
  payload: {
    totalCpuUsageRate: number;
    topProcesses: any[];
  };
}
