# P123 Stock Chart Demo

Candlestick EOD chart with selectable SMA overlays and time ranges, built in **React** with **Highcharts Stock**.

Task: “Create a web page that draws the EOD price chart for a stock using candlesticks…”.

---

## Features

* **Highcharts candlestick** + (optional) volume pane
* **4 predefined SMAs** (20/50/150/200) – toggled via dropdown with checkboxes
* **Time ranges:** 1D · 1W · 1M · 3M · 6M · 1Y · 2Y custom From/To calendar inputs
* **Shared tooltip & crosshair** (hover updates all prices like TradeVision’s red labels)
* **Responsive layout** – chart reflows on resize, controls wrap nicely on mobile
* **Error handling** for API limits/invalid tickers (never renders a silent blank screen)
* **Dummy JSON fallback** so UI still works offline or when rate‑limited

---

## Tech Stack

* **React 18**
* **Vite**
* **Highcharts Stock** via `highcharts-react-official`
* **date-fns**
* **Axios**

---

## Quick Start (Local)

```bash
npm install
# add your key (see next section). For quick tests you can skip; it will use 'demo'.
echo "VITE_AV_KEY=YOUR_ALPHA_VANTAGE_KEY" > .env
npm run dev   # http://localhost:5173
```

---

## Alpha Vantage API Key

1. Get a free key: [https://www.alphavantage.co/support/#api-key]
2. Put it in `.env` with the **VITE\_** prefix so Vite exposes it to the client:

```
VITE_AV_KEY=YOUR_REAL_KEY
```

Vite reads env vars at startup—restart `npm run dev` after editing.

If you omit the key, the app falls back to the public `demo` key (IBM/MSFT only and heavily rate‑limited), or to bundled demo JSON in hard failure cases.

---



```
src/
├── api/
│   ├── prices.js
│   └── demo_ibm.json
├── components/
│   ├── ChartContainer/
│   │   ├── ChartContainer.js
│   │   └── chartOptions.js
│   ├── DateRangePicker/
│   │   └── DateRangePicker.js  # From/To calendar inputs
│   ├── PeriodSelector/
│   │   └── PeriodSelector.js   # 1D/1W/1M/3M/6M/1Y/2Y buttons
│   ├── SmaDropdown/
│   │   └── SmaDropdown.jsx     # Dropdown with SMA checkboxes
│   └── Header/
│       └── Header.js           # Ticker input + brand
├── context/ChartContext.js     # Global state: reducer + provider
├── hooks/
│   ├── useStockData.js         # Fetches data when ticker changes
│   └── useOnClickOutside.js    # Utility for dropdown close
├── utils/math.js               # calcSMA helper
├── App.js
├── main.jsx
└── index.css
```

**Why this layout?** Feature‑first folders keep logic, UI, and config for each slice together (e.g., ChartContainer owns its `chartOptions`). Everything else is reusable primitives (hooks, utils).

--

## Scripts

```bash
npm run dev      # start dev server
npm run build    # production build -> dist/
npm run preview  # local preview of the build
```

---