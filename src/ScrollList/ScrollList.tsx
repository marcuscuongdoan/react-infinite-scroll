/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import useGetProductList from "../api";
import { TProduct } from "../type";
import classes from "./ScrollList.module.scss";
import _ from "lodash";

const ScrollList = () => {
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);

  const [list, setList] = useState<TProduct[]>([]);
  const ref = useRef<HTMLUListElement | null>(null);

  const {
    data: productList,
    isFetching,
    refetch,
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

  useEffect(() => {
    console.log("searching");
    setList([]);
    setSkip(0);
    refetch();
  }, [search]);

  const onInput = (value: string) => {
    setSearch(value);
  };

  const debouceOnInput = useCallback(_.debounce(onInput, 500), []);

  const onScroll = () => {
    if (!ref.current) return;
    if (productList && productList.total && list.length === productList.total)
      return;

    if (
      ref.current.scrollTop + ref.current.offsetHeight >=
      ref.current.scrollHeight - 40
    ) {
      setSkip(list.length || 0);
      refetch();
    }
  };

  return (
    <div className={classes.list}>
      <input
        className={classes.input}
        placeholder="Search"
        onChange={(event) => debouceOnInput(event.target.value)}
      />
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
          (!isFetching && "empty")}
        {isFetching && "loading..."}
      </ul>
    </div>
  );
};

export default ScrollList;
