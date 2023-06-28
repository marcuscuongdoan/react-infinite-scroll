export type TGetProductListParams = {
  search?: string;
  limit?: number;
  skip?: number;
  select?: Partial<TProduct>;
};

export type TProduct = {
  id: number | string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  images: string[];
};

export type TProductList = {
  products: TProduct[];
  total: number;
  skip: number;
  limit: number;
};
