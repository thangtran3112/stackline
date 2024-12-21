import { getProducts } from "../api/products";
import { useAppSelector } from "../stores/hooks";
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Sale } from "../stores/slices/productsSlice";
import { useState } from "react";

interface SearchableDataGridProps {
  searchInput: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sales: Sale[];
  filteredSales: Sale[];
  columns: GridColDef[];
}

const SearchableDataGrid: React.FC<SearchableDataGridProps> = ({
  searchInput,
  handleSearch,
  sales,
  filteredSales,
  columns,
}) => {
  return (
    <>
      <TextField
        label="Search by Week Ending"
        variant="outlined"
        value={searchInput}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
      <Box height="80vh" sx={{ overflow: "auto" }}>
        <DataGrid
          loading={!sales.length}
          getRowId={(row: Sale) => row.weekEnding}
          rows={filteredSales || []}
          columns={columns}
          pagination
          paginationMode="client"
          sortingMode="client"
        />
      </Box>
    </>
  );
};

const SaleTable = () => {
  const [searchInput, setSearchInput] = useState("");

  const products = useAppSelector(getProducts);
  const sales = products.length > 0 ? products[0].sales : [];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const filteredSales = sales.filter((sale) =>
    sale.weekEnding.toLowerCase().includes(searchInput.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "weekEnding", headerName: "Week Ending", flex: 1 },
    { field: "retailSales", headerName: "Retail Sales", flex: 1 },
    { field: "wholesaleSales", headerName: "Wholesale Sales", flex: 1 },
    { field: "unitsSold", headerName: "Units Sold", flex: 1 },
    { field: "retailerMargin", headerName: "Retailer Margin", flex: 1 },
  ];

  return (
    <>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ textAlign: "center" }}>
          Table
        </Typography>
        <SearchableDataGrid
          searchInput={searchInput}
          handleSearch={handleSearch}
          sales={sales}
          filteredSales={filteredSales}
          columns={columns}
        />
      </Container>
    </>
  );
};

export default SaleTable;
