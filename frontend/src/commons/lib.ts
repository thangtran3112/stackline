import { Sale } from "../stores/slices/productsSlice";

interface MonthlySale {
  month: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const aggregateSalesByMonth = (sales: Sale[]): MonthlySale[] => {
  const monthlySales: { [key: string]: MonthlySale } = {};

  sales.forEach((sale) => {
    const date = new Date(sale.weekEnding);
    const month = monthNames[date.getMonth()];

    if (!monthlySales[month]) {
      monthlySales[month] = {
        month,
        retailSales: 0,
        wholesaleSales: 0,
        unitsSold: 0,
        retailerMargin: 0,
      };
    }

    monthlySales[month].retailSales += sale.retailSales;
    monthlySales[month].wholesaleSales += sale.wholesaleSales;
    monthlySales[month].unitsSold += sale.unitsSold;
    monthlySales[month].retailerMargin += sale.retailerMargin;
  });

  return Object.values(monthlySales);
};
