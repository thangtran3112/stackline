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

  const maxHeight = isNonMobile ? "50vh" : "50vh";
  const maxWidth = isNonMobile ? "80vw" : "100vw";
  const dividerOrientation = isNonMobile ? "vertical" : "horizontal";

  return (
    <Stack direction={isNonMobile ? "row" : "column"} spacing={4}>
      {!isNonMobile && (
        <Stack spacing={2}>
          <ProductCard product={data?.[0] as ProductDetails} />
          <SaleChart />
          <SaleTable />
        </Stack>
      )}
      {isNonMobile && (
        <Stack spacing={2} direction="row">
          <ProductCard product={data?.[0] as ProductDetails} />
          <Container sx={{ maxHeight, maxWidth }}>
            <SaleChart />
            <SaleTable />
          </Container>
        </Stack>
      )}
    </Stack>
  );
};

export default SaleReport;
