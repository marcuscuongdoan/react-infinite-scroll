import { useQuery } from "react-query";
import { TGetProductListParams, TProductList } from "./type";

async function getProductList({ search, limit, skip }: TGetProductListParams) {
  return await fetch(
    `https://dummyjson.com/products${
      search ? "/search?q=" + search : "?"
    }&limit=${limit}&skip=${skip}`
  ).then((data) => data.json());
}

const useGetProductList = ({ search, limit, skip }: TGetProductListParams) => {
  return useQuery<TProductList>(
    ["https://dummyjson.com/products", search, skip],
    () => getProductList({ search, limit, skip }),
    { cacheTime: 0, enabled: false }
  );
};

export default useGetProductList;
