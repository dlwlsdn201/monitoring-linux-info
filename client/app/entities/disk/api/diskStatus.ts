import { BASE_API_URL } from 'client/config';
import { ServerDiskStatusResponseData } from '../../../../types/server';
import dayjs from 'dayjs';

export const fetchDiskStatus = async (): Promise<{
  isError: boolean;
  data: ServerDiskStatusResponseData;
  error: string | unknown;
}> => {
  let result: {
    isError: boolean;
    data: ServerDiskStatusResponseData;
    error: string | unknown;
  } = {
    isError: false,
    error: '',
    data: {
      payload: {
        size: '',
        used: '',
        avail: '',
        capacity: '',
        filesystem: '',
      },
      timestamp: '',
    },
  };

  try {
    const response = await fetch(`${BASE_API_URL}/status/disk`, {
      cache: 'no-store',
    });
    if (response.ok) {
      const resData = await response.json();
      const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
      result.data = {
        ...result.data,
        payload: resData.payload,
        timestamp,
      };
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
