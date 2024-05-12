export const chartKeys: {
  [key: string]: string[];
} = {
  usage: ['avail', 'used'],
};

export const chartColors = {
  usage: {
    avail: '#51b811',
    used: '#eb5228',
  },
};

export const serverName = process.env.NEXT_PUBLIC_TARGET_SERVER_NAME || '';
