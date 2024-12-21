import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { useAppDispatch } from "../stores/hooks";
import { setProducts } from "../stores/slices/productsSlice";

export const PRODUCTS_CACHE_KEY = "products";

export const useProducts = () => {
  const dispatch = useAppDispatch();

  const { isLoading, data, error } = useQuery({
    queryKey: [PRODUCTS_CACHE_KEY], //may use cache to avoid constantly fetching
    queryFn: () => getProducts(),
  });

  if (data) {
    dispatch(setProducts(data));
  }

  return { isLoading, data, error };
};
