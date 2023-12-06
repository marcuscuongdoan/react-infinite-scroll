import {
  TCreateProductParams,
  TGetProductListParams,
  TProductList,
} from '../type'
import { useMutation, useQuery } from 'react-query'

async function getProductList({ search, limit, skip }: TGetProductListParams) {
  return await fetch(
    `https://dummyjson.com/products${
      search ? '/search?q=' + search : '?'
    }&limit=${limit}&skip=${skip}`
  ).then(data => data.json())
}

export const useGetProductList = ({
  search,
  limit,
  skip,
}: TGetProductListParams) => {
  return useQuery<TProductList>(
    ['https://dummyjson.com/products', search, skip],
    () => getProductList({ search, limit, skip }),
    { cacheTime: 0, enabled: false }
  )
}

async function createProduct(params: TCreateProductParams) {
  fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...params,
    }),
  }).then(res => res.json())
}

export const useCreateProduct = () => {
  return useMutation(createProduct)
}

async function updateProduct({
  id,
  ...params
}: TCreateProductParams & { id: number | string }) {
  fetch(`https://dummyjson.com/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...params,
    }),
  }).then(res => res.json())
}

export const useUpdateProduct = () => {
  return useMutation(updateProduct)
}

async function deleteProduct({ id }: { id: number | string }) {
  fetch(`https://dummyjson.com/products/${id}`, {
    method: 'DELETE',
  }).then(res => res.json())
}

export const useDeleteProduct = () => {
  return useMutation(deleteProduct)
}
