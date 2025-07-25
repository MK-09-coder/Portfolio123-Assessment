import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import getOptions from "./chartOptions";
import { useChart } from "../../context/ChartContext";
import useStockData from "../../hooks/useStockData";

export default function ChartContainer() {
  const { state } = useChart();
  useStockData();

  if (state.loading) return <p>Loading …</p>;
  if (state.error) return <p className="error">{state.error}</p>;
  if (!state.ohlcv.length) return <p>No data available.</p>;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={getOptions(state)}
    />
  );
}
