export interface ServerDiskStatusProps {
  size: string;
  used: string;
  avail: string;
  capacity: string;
  filesystem: string;
}

export interface ServerStatusProps {
  payload: {
    diskStatus: ServerDiskStatusProps;
    cpuStatus: any;
  };
  timestamp: string | undefined;
}
