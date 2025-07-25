import { useChart } from "../../context/ChartContext";

const smaList = [20, 50, 150, 200];

export default function SmASelector() {
  const { state, dispatch } = useChart();
  return (
    <div className="sma-selector">
      {smaList.map((len) => (
        <label key={len}>
          <input
            type="checkbox"
            checked={state.smas.includes(len)}
            onChange={() => dispatch({ type: "TOGGLE_SMA", length: len })}
          />
          SMA({len})
        </label>
      ))}
    </div>
  );
}
