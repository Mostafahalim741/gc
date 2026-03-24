import { useState, useEffect } from "react";
import { useGetGoldPrices, useGetLiveRates } from "@workspace/api-client-react";

export type CalculatorInputs = {
  usdRate: number;
  ouncePriceUsd: number;
  workmanship: number;
};

const DEFAULT_INPUTS: CalculatorInputs = {
  usdRate: 48.50,
  ouncePriceUsd: 2350.00,
  workmanship: 150,
};

export function useGoldCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [debouncedInputs, setDebouncedInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [liveEnabled, setLiveEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputs(inputs);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputs]);

  const query = useGetGoldPrices({
    usdRate: debouncedInputs.usdRate,
    ouncePriceUsd: debouncedInputs.ouncePriceUsd,
    workmanship: debouncedInputs.workmanship || 0,
  });

  const liveRatesQuery = useGetLiveRates({
    query: {
      enabled: liveEnabled,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  });

  useEffect(() => {
    if (liveRatesQuery.data) {
      setInputs(prev => ({
        ...prev,
        ouncePriceUsd: liveRatesQuery.data.ouncePriceUsd,
        usdRate: liveRatesQuery.data.usdToEgp,
      }));
      setLiveEnabled(false);
    }
  }, [liveRatesQuery.data]);

  const fetchLiveRates = () => {
    setLiveEnabled(true);
    liveRatesQuery.refetch();
  };

  return {
    inputs,
    setInputs,
    query,
    fetchLiveRates,
    isFetchingLive: liveRatesQuery.isFetching,
    liveError: liveRatesQuery.isError,
    liveSource: liveRatesQuery.data?.source,
    liveFetchedAt: liveRatesQuery.data?.fetchedAt,
  };
}
