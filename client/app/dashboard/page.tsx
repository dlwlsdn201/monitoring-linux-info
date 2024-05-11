import { getServerStatusData } from './api/status/functions';
import Dashboard from './ui/index';

export default async function DashboardPage() {
  // if (typeof window === 'undefined') {
  //   return null;
  // }
  const {
    data: { payload, timestamp },
  } = await getServerStatusData();
  return <Dashboard rawData={payload} timestamp={timestamp} />;
}
