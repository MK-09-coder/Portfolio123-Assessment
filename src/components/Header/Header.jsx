import { useChart } from "../../context/ChartContext";

export default function Header() {
  const { state, dispatch } = useChart();
  return (
    <header className="header">
      <input
        className="ticker-input"
        value={state.ticker}
        onChange={(e) =>
          dispatch({ type: "SET_TICKER", ticker: e.target.value.toUpperCase() })
        }
      />
      <span className="brand">Portfolio123 · Demo</span>
    </header>
  );
}
