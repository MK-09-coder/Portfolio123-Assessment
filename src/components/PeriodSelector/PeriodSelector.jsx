import { useChart } from "../../context/ChartContext";
import { subDays, subWeeks, subMonths, subYears } from "date-fns";

const presets = [
  { label: "1D", fn: () => subDays(new Date(), 1) },
  { label: "1W", fn: () => subWeeks(new Date(), 1) },
  { label: "1M", fn: () => subMonths(new Date(), 1) },
  { label: "3M", fn: () => subMonths(new Date(), 3) },
  { label: "6M", fn: () => subMonths(new Date(), 6) },
  { label: "1Y", fn: () => subYears(new Date(), 1) },
  { label: "2Y", fn: () => subYears(new Date(), 2) },
];

export default function PeriodSelector() {
  const { state, dispatch } = useChart();

  const pick = (p) => {
    const from = p.fn();
    dispatch({
      type: "SET_PERIOD",
      period: { preset: p.label, from, to: new Date() },
    });
  };

  return (
    <div className="period-selector">
      {presets.map((p) => (
        <button
          key={p.label}
          className={state.period.preset === p.label ? "active" : ""}
          onClick={() => pick(p)}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}