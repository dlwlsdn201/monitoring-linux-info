import { ServerDiskStatusProps } from 'client/types/server';
import { fetchDiskStatus } from '../api';

export const useData = async () => {
  try {
    const {
      data,
      isError,
      error,
    }: {
      isError: boolean;
      data: { payload: ServerDiskStatusProps; timestamp: string };
      error: string | unknown;
    } = await fetchDiskStatus();

    return { data, isError, error };
  } catch (error) {
    throw Error();
  }
};
