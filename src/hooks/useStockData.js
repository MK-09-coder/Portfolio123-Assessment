import { useEffect } from "react";
import { useChart } from "../context/ChartContext";
import { fetchDaily } from "../api/prices";

export default function useStockData() {
  const { state, dispatch } = useChart();
  const { ticker } = state;

  useEffect(() => {
    let ignore = false;
    (async () => {
      dispatch({ type: "LOADING" });
      try {
        const data = await fetchDaily(ticker);
        if (!ignore) dispatch({ type: "SET_DATA", data });
      } catch (err) {
        if (!ignore)
          dispatch({ type: "ERROR", error: err.message || String(err) });
      }
    })();
    return () => {
      ignore = true;
    };
  }, [ticker, dispatch]);
}
