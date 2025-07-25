import { useState } from "react";
import { useChart } from "../../context/ChartContext";

export default function DateRangePicker() {
  const { state, dispatch } = useChart();
  const [fromStr, setFromStr] = useState(
    state.period.from ? toISODate(state.period.from) : ""
  );
  const [toStr, setToStr] = useState(toISODate(state.period.to || new Date()));

  function apply() {
    if (!fromStr || !toStr) return;
    dispatch({
      type: "SET_PERIOD",
      period: {
        preset: "CUSTOM",
        from: new Date(fromStr),
        to: new Date(toStr),
      },
    });
  }

  return (
    <div className="date-range">
      <label>
        From:{" "}
        <input
          type="date"
          value={fromStr}
          onChange={(e) => setFromStr(e.target.value)}
        />
      </label>
      <label>
        To:{" "}
        <input
          type="date"
          value={toStr}
          onChange={(e) => setToStr(e.target.value)}
        />
      </label>
      <button onClick={apply}>Apply</button>
    </div>
  );
}

function toISODate(d) {
  return new Date(d).toISOString().slice(0, 10);
}