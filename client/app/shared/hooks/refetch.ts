export const useRefetch = (fetchAPIFunction: Function, interval: number) => {
  const intervalId = setInterval(fetchAPIFunction, interval); // 60초마다 fetch

  const clearRefetchInterval = () => clearInterval(intervalId);

  // useEffect 의 return 구문 (컴포넌트 unmount 시, interval clear 함수 실행)
  return clearRefetchInterval;
};
