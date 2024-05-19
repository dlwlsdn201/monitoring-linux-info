import { ServerCpuResponseData } from 'client/types/server';
import { fetchCpuStatus } from '../api';

export const useCpuData = async () => {
  try {
    const {
      data,
      isError,
      error,
    }: {
      isError: boolean;
      data: ServerCpuResponseData;
      error: string | unknown;
    } = await fetchCpuStatus();

    return { data, isError, error };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
