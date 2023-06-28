/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import useGetProductList from "../api";
import { TProduct } from "../type";
import classes from "./ScrollList.module.scss";

const ScrollList = () => {
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);

  const [list, setList] = useState<TProduct[]>([]);
  const ref = useRef<HTMLUListElement | null>(null);

  const {
    data: productList,
    isLoading: isLoadingProductList,
    isFetching,
    refetch,
    isPreviousData,
  } = useGetProductList({ search, limit: 15, skip: skip });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (
      productList &&
      productList.products.length &&
      productList.products.length
    )
      setList([...list, ...productList?.products]);
  }, [productList]);

  const onInput = (value: string) => {
    setSearch(value);
  };

  const onSearch = () => {
    if (isPreviousData) return;

    setList([]);
    setSkip(0);
    refetch();
  };

  const onScroll = () => {
    if (!ref.current) return;
    if (productList && productList.total && list.length === productList.total)
      return;

    if (
      ref.current.scrollTop + ref.current.offsetHeight >=
      ref.current.scrollHeight - 10
    ) {
      setSkip(list.length || 0);
      refetch();
    }
  };

  return (
    <div className={classes.list}>
      <div>
        <input
          className={classes.input}
          placeholder="Search"
          value={search}
          onChange={(event) => onInput(event.target.value)}
        />
        <button
          className={classes.button}
          onClick={() => {
            onSearch();
          }}
        >
          Search
        </button>
      </div>
      <ul
        style={{
          height: 200,
          overflowY: "scroll",
          listStyleType: "none",
        }}
        ref={ref}
        onScroll={onScroll}
      >
        {(list &&
          list.length &&
          list.map((product) => (
            <li key={product.id}>
              <div>{product.title}</div>
              <div>{product.price}</div>
            </li>
          ))) ||
          "empty"}
        {isLoadingProductList && !isFetching && "loading..."}
      </ul>
    </div>
  );
};

export default ScrollList;
