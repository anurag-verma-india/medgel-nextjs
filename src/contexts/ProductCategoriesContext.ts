import { ProductContextProps } from "@/types";
import { createContext } from "react";

const ProductCategoriesContext = createContext<ProductContextProps>({
  productsState: {
    activeCategory: 0,
    loading: true, // Start with loading true
    categories: [],
    errors: [],
  },
  setProductsState: () => {},
  refetchData: () => {},
});

export default ProductCategoriesContext;
