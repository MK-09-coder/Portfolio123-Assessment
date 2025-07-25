export function calcSMA(data, window) {
  let sum = 0;
  const res = [];
  data.forEach((row, idx) => {
    sum += row.c;
    if (idx >= window) sum -= data[idx - window].c;
    if (idx >= window - 1) {
      res.push([row.t, +(sum / window).toFixed(2)]);
    }
  });
  return res;
}
