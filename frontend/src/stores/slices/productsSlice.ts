import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Review {
  customer: string;
  review: string;
  score: number;
}

export interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

export interface ProductDetails {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: Review[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: Sale[];
}

const initialState: ProductDetails[] = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(_state, action: PayloadAction<ProductDetails[]>) {
      return action.payload;
    },
    getProducts(state) {
      return state;
    },
  },
});

export const { setProducts, getProducts } = productsSlice.actions;
export default productsSlice.reducer;
