export type TGetProductListParams = {
  search?: string;
  limit?: number;
  skip?: number;
  select?: Partial<TProduct>;
};

export type TCreateProductParams = {
  title: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  category?: string;
  thumbnail?: string;
  images?: string[];
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

export type TLoginParams = {
  username: string;
  password: string;
};

export type TError = {
  message: string;
};

export type TUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  image: string;
  token: string;
};
