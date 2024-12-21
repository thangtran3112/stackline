import { useAppSelector } from "../stores/hooks";
import { getProducts } from "../api/products";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { aggregateSalesByMonth } from "../commons/lib";
import { useTheme } from "@mui/material";

/**
 * For simle chart, we can use https://recharts.org/en-US/examples
 * For more complex chart, we can use https://nivo.rocks/components/
 */
const SaleChart = () => {
  const theme = useTheme();
  const data = useAppSelector(getProducts);
  const firstProductSales = data[0].sales;
  const chartData = aggregateSalesByMonth(firstProductSales);
  const strokeColorRetailSales =
    theme.palette.mode === "dark" ? "#8884d8" : "#20a8b9";
  const strokeColorWholesaleSales =
    theme.palette.mode === "dark" ? "#1dbe5b" : "#d114a8";
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="retailSales"
          stroke={strokeColorRetailSales}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="wholesaleSales"
          stroke={strokeColorWholesaleSales}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SaleChart;
