import { calcSMA } from "../../utils/math";

export default function getOptions(state) {
  const { ohlcv, smas, period, ticker } = state;
  const from = period.from ? period.from.getTime() : null;
  const filtered = from ? ohlcv.filter((r) => r.t >= from) : ohlcv;

  const ohlc = filtered.map((r) => [r.t, r.o, r.h, r.l, r.c]);
  const volume = filtered.map((r) => [r.t, r.v]);

  const series = [
    { type: "candlestick", id: "price", name: ticker, data: ohlc },
    {
      type: "column",
      name: "Volume",
      data: volume,
      yAxis: 1,
      color: "rgba(100,100,100,.3)",
      visible: false,
    },
  ];

  smas.forEach((len) => {
    series.push({
      type: "line",
      name: `SMA ${len}`,
      data: calcSMA(filtered, len),
      tooltip: { valueDecimals: 2 },
    });
  });

  return {
    tooltip: { shared: true },
    xAxis: { type: "datetime" },
    yAxis: [
      { labels: { align: "right", x: -2 }, title: { text: "Price" } },
      {
        labels: { align: "right", x: -2 },
        title: { text: "Volume" },
        top: "75%",
        height: "25%",
        offset: 0,
      },
    ],
    series,
    responsive: {
      rules: [
        {
          condition: { maxWidth: 600 },
          chartOptions: {
            rangeSelector: { inputEnabled: false },
          },
        },
      ],
    },
  };
}
