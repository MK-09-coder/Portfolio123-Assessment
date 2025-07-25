import { useRef, useState } from "react";
import { useChart } from "../../context/ChartContext";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const SMA_LIST = [20, 50, 150, 200];

export default function SmaDropdown() {
  const { state, dispatch } = useChart();
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  useOnClickOutside(boxRef, () => setOpen(false));

  const toggle = (len) =>
    dispatch({ type: "TOGGLE_SMA", length: len });

  return (
    <div className="sma-dropdown" ref={boxRef}>
      <button className="sma-btn" onClick={() => setOpen((o) => !o)}>
        SMA ▾
      </button>
      {open && (
        <div className="sma-menu">
          {SMA_LIST.map((len) => (
            <label key={len} className="sma-item">
              <input
                type="checkbox"
                checked={state.smas.includes(len)}
                onChange={() => toggle(len)}
              />
              SMA({len})
            </label>
          ))}
        </div>
      )}
    </div>
  );
}