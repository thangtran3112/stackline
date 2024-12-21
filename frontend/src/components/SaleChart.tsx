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
import { aggregateSalesByMonth, MonthlySale } from "../commons/lib";
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { FullscreenTwoTone } from "@mui/icons-material";

interface CustomLineChartProps {
  chartData: MonthlySale[];
  width: number;
  height: number;
  strokeColorRetailSales: string;
  strokeColorWholesaleSales: string;
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({
  chartData,
  strokeColorRetailSales,
  strokeColorWholesaleSales,
  width,
  height,
}) => {
  return (
    <LineChart
      width={width}
      height={height}
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
  );
};

/**
 * For simle chart, we can use https://recharts.org/en-US/examples
 * For more complex chart, we can use https://nivo.rocks/components/
 */
const SaleChart = () => {
  const theme = useTheme();
  const data = useAppSelector(getProducts);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!data) {
    return <CircularProgress />;
  }

  const firstProductSales = data[0].sales;
  const chartData = aggregateSalesByMonth(firstProductSales);
  const strokeColorRetailSales =
    theme.palette.mode === "dark" ? "#8884d8" : "#20a8b9";
  const strokeColorWholesaleSales =
    theme.palette.mode === "dark" ? "#1dbe5b" : "#d114a8";

  const width = isNonMobile ? 800 : 480;
  const height = isNonMobile ? 800 : 360;
  return (
    <>
      <Typography variant="h2" gutterBottom sx={{ textAlign: "center" }}>
        Monthly Sales
        <IconButton
          onClick={handleOpen}
          sx={{ marginLeft: 1, transform: "scale(1.5)" }}
        >
          <FullscreenTwoTone />
        </IconButton>
      </Typography>
      {isNonMobile ? (
        <ResponsiveContainer width="100%" height="60%">
          <CustomLineChart
            chartData={chartData}
            strokeColorRetailSales={strokeColorRetailSales}
            strokeColorWholesaleSales={strokeColorWholesaleSales}
            width={width}
            height={height}
          />
        </ResponsiveContainer>
      ) : (
        <CustomLineChart
          chartData={chartData}
          strokeColorRetailSales={strokeColorRetailSales}
          strokeColorWholesaleSales={strokeColorWholesaleSales}
          width={width}
          height={height}
        />
      )}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.9)"
              : "rgba(255, 255, 255, 0.9)",
        }}
        open={open}
        onClick={handleClose}
      >
        <div style={{ width: "80%", height: "60%" }}>
          <ResponsiveContainer width="100%" height="60%">
            <CustomLineChart
              chartData={chartData}
              strokeColorRetailSales={strokeColorRetailSales}
              strokeColorWholesaleSales={strokeColorWholesaleSales}
              width={width}
              height={height}
            />
          </ResponsiveContainer>
        </div>
      </Backdrop>
    </>
  );
};

export default SaleChart;
