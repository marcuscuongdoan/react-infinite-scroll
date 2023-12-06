/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash'
import classes from './ScrollList.module.scss'
import { ProductModal } from '../ProductModal'
import { TProduct } from '../../type'
import { UserContext } from '../../App'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useGetProductList } from '../../api'

const ScrollList = () => {
  const { user, setUser } = useContext(UserContext)
  const [search, setSearch] = useState('')
  const [skip, setSkip] = useState(0)

  const [list, setList] = useState<TProduct[]>([])

  const [selectedProduct, setSelectedProduct] = useState<TProduct>()

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLUListElement | null>(null)

  const {
    data: productList,
    isFetching,
    refetch,
  } = useGetProductList({ search, limit: 15, skip })

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (
      productList &&
      productList.products.length &&
      productList.products.length
    )
      setList([...list, ...productList?.products])
  }, [productList])

  useEffect(() => {
    setList([])
    setSkip(0)
    refetch()
  }, [search])

  const onInput = (value: string) => {
    setSearch(value)
  }

  const debouceOnInput = useCallback(_.debounce(onInput, 500), [])

  const onScroll = () => {
    if (!ref.current) return
    if (productList && productList.total && list.length === productList.total)
      return

    if (
      ref.current.scrollTop + ref.current.offsetHeight >=
      ref.current.scrollHeight - 40
    ) {
      setSkip(list.length || 0)
      refetch()
    }
  }

  return (
    <>
      <div className={classes.list}>
        {user && <p>{`Welcome ${user?.firstName} ${user?.lastName}!`}</p>}
        <input
          className={classes.input}
          placeholder="Search"
          onChange={event => debouceOnInput(event.target.value)}
        />
        <div className={classes['button-wrapper']}>
          <button
            onClick={() => {
              setUser()
              localStorage.removeItem('user')
            }}
          >
            Logout
          </button>
        </div>
        <ul
          style={{
            height: 200,
            overflowY: 'scroll',
            listStyleType: 'none',
          }}
          ref={ref}
          onScroll={onScroll}
        >
          {(list &&
            list.length &&
            list.map(product => (
              <li
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product)
                  setOpen(true)
                }}
              >
                <div>{product.title}</div>
                <div>{product.price}</div>
              </li>
            ))) ||
            (!isFetching && 'empty')}
          {isFetching && 'loading...'}
        </ul>
        <div className={classes['button-wrapper']}>
          <button
            onClick={() => {
              setOpen(true)
            }}
          >
            Create
          </button>
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        open={open}
        onClose={(isSuccess?: boolean) => {
          setOpen(false)
          setSelectedProduct(undefined)

          if (isSuccess) refetch()
        }}
      />
    </>
  )
}

export default ScrollList
