import { BASE_URL } from '../config';
import { ServerStatusProps } from '../../../../types/server';

export const getServerStatusData = async (): Promise<{
  isError: boolean;
  data: ServerStatusProps;
  error: string | unknown;
}> => {
  let result: {
    isError: boolean;
    data: ServerStatusProps;
    error: string | unknown;
  } = {
    isError: false,
    error: '',
    data: {
      payload: {
        diskStatus: {
          size: '',
          used: '',
          avail: '',
          capacity: '',
          filesystem: '',
        },
        cpuStatus: null,
      },
      timestamp: undefined,
    },
  };
  try {
    const response = await fetch(`${BASE_URL}/dashboard/api/status`, {
      cache: 'no-store',
    });
    if (response.ok) {
      const resData = await response.json();
      console.log({ resData });
      result.data.payload = resData.payload;
      result.data.timestamp = resData.timestamp;
    } else {
      throw Error();
    }
  } catch (error) {
    result.isError = true;
    result.error = error;
    console.error('API 호출 중 에러 발생:', error);
  } finally {
    return result;
  }
};
