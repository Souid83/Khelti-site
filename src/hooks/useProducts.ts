import { useJsonData } from './useJsonData';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: string;
  image: string;
  category: string;
  available: boolean;
  isNew?: boolean;
  featured?: boolean;
}

interface ProductsData {
  products: Product[];
}

export function useProducts() {
  const { data, loading, error } = useJsonData<ProductsData>('/data/products.json');

  return {
    products: data?.products || [],
    loading,
    error
  };
}
