import Dashboard from './ui';
import { getServerStatusData } from './api/status/functions';

export default async function DashboardPage() {
  const {
    data: { payload, timestamp },
  } = await getServerStatusData();
  return <Dashboard rawData={payload} timestamp={timestamp} />;
}
