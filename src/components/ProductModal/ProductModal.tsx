import classes from './ProductModal.module.scss'
import { TProduct } from '../../type'
import { useCreateProduct, useDeleteProduct, useUpdateProduct } from '../../api'
import { useEffect, useState } from 'react'

type TProductProps = {
  product?: Partial<TProduct>
  open: boolean
  onClose: (success?: boolean) => void
}

export const ProductModal = ({
  product,
  open = false,
  onClose,
}: TProductProps) => {
  const [title, setTitle] = useState(product?.title || '')

  useEffect(() => {
    setTitle(product?.title || '')
  }, [product])

  const { mutate: createProduct, isLoading: isLoadingCreate } =
    useCreateProduct()

  const { mutate: updateProduct, isLoading: isLoadingUpdate } =
    useUpdateProduct()

  const { mutate: deleteProduct, isLoading: isLoadingDelete } =
    useDeleteProduct()

  const onCreate = () => {
    createProduct(
      { title },
      {
        onSuccess: () => {
          alert('Create Successful!')
          onClose(true)
        },
      }
    )
  }

  const onUpdate = () => {
    updateProduct(
      { id: product?.id!, title },
      {
        onSuccess: () => {
          alert('Update Successful!')
          onClose(true)
        },
      }
    )
  }

  const onDelete = () => {
    deleteProduct(
      { id: product?.id! },
      {
        onSuccess: () => {
          alert('Delete Successful!')
          onClose(true)
        },
      }
    )
  }

  return (
    <>
      {open && (
        <div className={classes['modal-wrapper']}>
          <div className={classes.modal}>
            <span className={classes.close} onClick={() => onClose()}>
              x
            </span>
            <p>
              {product ? `Product Id: ${product.id}` : 'Create new Product'}
            </p>
            <label>Product Name</label>
            <input
              name="title"
              placeholder="Product Name"
              required
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
            <div className={classes['button-wrapper']}>
              {product && (
                <button
                  disabled={isLoadingDelete || isLoadingUpdate}
                  onClick={onDelete}
                >
                  Delete
                </button>
              )}
              <button
                disabled={isLoadingCreate || isLoadingUpdate || isLoadingDelete}
                onClick={() => {
                  if (!product) return onCreate()
                  return onUpdate()
                }}
              >
                {product ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
