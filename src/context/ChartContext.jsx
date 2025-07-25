import { createContext, useContext, useReducer } from "react";

const initialState = {
  ticker: "IBM",
  period: { preset: "6M", from: null, to: null },
  smas: [50, 150],
  ohlcv: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TICKER":
      return { ...state, ticker: action.ticker };
    case "SET_PERIOD":
      return { ...state, period: action.period };
    case "TOGGLE_SMA":
      return {
        ...state,
        smas: state.smas.includes(action.length)
          ? state.smas.filter((n) => n !== action.length)
          : [...state.smas, action.length],
      };
    case "SET_DATA":
      return { ...state, ohlcv: action.data, loading: false, error: null };
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "ERROR":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

const ChartContext = createContext();
export const useChart = () => useContext(ChartContext);

export function ChartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ChartContext.Provider value={{ state, dispatch }}>
      {children}
    </ChartContext.Provider>
  );
}
