import { getProducts } from "../api/products";
import { useAppSelector } from "../stores/hooks";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Sale } from "../stores/slices/productsSlice";
import { useState } from "react";

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
    <Box m="1.5rem 2.5rem">
      <Typography variant="h2" gutterBottom>
        Sales Table
      </Typography>
      <TextField
        label="Search by Week Ending"
        variant="outlined"
        value={searchInput}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
      <Box height="80vh">
        <DataGrid
          loading={!sales}
          getRowId={(row: Sale) => row.weekEnding}
          rows={filteredSales || []}
          columns={columns}
          rowCount={(filteredSales && filteredSales.length) || 0}
          pagination
          paginationMode="client"
          sortingMode="client"
        />
      </Box>
    </Box>
  );
};

export default SaleTable;
