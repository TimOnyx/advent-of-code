
export const getTotal = (results: number[]): number => {
  let total = 0;
  for (const bid of results) {
    total += bid;
  }
  return total;
};
