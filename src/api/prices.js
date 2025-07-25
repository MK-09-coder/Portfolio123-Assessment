import axios from "axios";
import demoIBM from "./demo_ibm.json";
import demoMSFT from "./demo_msft.json";

const API_KEY = import.meta.env.VITE_AV_KEY || "demo";
console.log(import.meta.env.VITE_AV_KEY);
const FALLBACKS = { IBM: demoIBM, MSFT: demoMSFT };

export async function fetchDaily(ticker = "IBM") {
  const url =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY" +
    `&symbol=${ticker}&apikey=${API_KEY}&outputsize=full`;

  try {
    const { data } = await axios.get(url);
    const series = data["Time Series (Daily)"];
    if (!series) throw data;
    return Object.entries(series)
      .map(([date, v]) => ({
        t: new Date(date).getTime(),
        o: +v["1. open"],
        h: +v["2. high"],
        l: +v["3. low"],
        c: +v["4. close"],
        v: +v["5. volume"],
      }))
      .reverse();
  } catch (err) {
    console.warn("Alpha Vantage error, using demo JSON:", err);
    return FALLBACKS[ticker] || demoIBM;
  }
}