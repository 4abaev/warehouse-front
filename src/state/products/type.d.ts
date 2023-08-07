type ProductsState = {
  products: Product[];
  currentProduct: Product | null;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
};

type Product = {
  id: string;
  articul: string;
  description: string;
  brand: string;
  category: string;
  picture: string;
  createdAt: string;
};

type createProductData = {
  articul: string;
  description: string;
  brand: string;
  category: string;
  picture: string;
}