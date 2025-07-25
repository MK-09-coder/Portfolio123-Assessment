import { ChartProvider } from "./context/ChartContext";
import Header from "./components/Header/Header";
import ChartContainer from "./components/ChartContainer/ChartContainer";
import PeriodSelector from "./components/PeriodSelector/PeriodSelector";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";
import SmaDropdown from "./components/SmaDropdown/SmaDropdown";

export default function App() {
  return (
    <ChartProvider>
      <div className="app">
        <Header />
        <div className="controls">
          <PeriodSelector />
          <SmaDropdown />
          <DateRangePicker />
        </div>
        <ChartContainer />
      </div>
    </ChartProvider>
  );
}