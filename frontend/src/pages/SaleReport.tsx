import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Stack,
  useMediaQuery,
} from "@mui/material";
import SaleChart from "../components/SaleChart";
import SaleTable from "../components/SaleTable";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { ProductDetails } from "../stores/slices/productsSlice";

const SaleReport = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Stack>
    );
  }

  console.log(data);

  const maxHeight = isNonMobile ? "50vh" : "20vh";
  const maxWidth = isNonMobile ? "80vw" : "100vw";
  return (
    <Stack
      direction={isNonMobile ? "row" : "column"}
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <ProductCard product={data?.[0] as ProductDetails} />
      <Container sx={{ maxHeight: maxHeight, maxWidth }}>
        <h1>Montly Sales</h1>
        <SaleChart />
        <SaleTable />
      </Container>
    </Stack>
  );
};

export default SaleReport;
