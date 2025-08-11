// import { ProductForm } from '@/features/product/product-form/ui/ProductForm'
// import { useProductForm } from '@/features/product/product-form/model/useProductForm'
// import { useAddProduct } from '@/features/product/add-product/model/useAddProduct'
// import { useEditProduct } from '@/features/product/edit-product/model/useEditProduct'

import { useAddProduct } from "@/features/product/add-product"
import { useEditProduct } from "@/features/product/edit-product"
import { ProductForm, useProductForm } from "@/features/product/product-form"


export const ProductEditFormWidget = ({ productId }) => {
  const isNew = !productId

  // Логіка для випадку "Редагування"
  const {
    title: editTitle,
    setTitle: setEditTitle,
    price: editPrice,
    setPrice: setEditPrice,
    isLoadingProduct,
    isUpdating,
    editProduct,
  } = useEditProduct(productId)

  // Логіка для випадку "Додавання" (ініціалізуємо порожню форму через useProductForm)
  const {
    title: addTitle,
    setTitle: setAddTitle,
    price: addPrice,
    setPrice: setAddPrice,
  } = useProductForm() // Порожня форма для додавання

  const { addProduct, isLoading: isAdding } = useAddProduct()

  // Вибір, які дані та обробники використовувати
  const currentTitle = isNew ? addTitle : editTitle
  const currentSetTitle = isNew ? setAddTitle : setEditTitle
  const currentPrice = isNew ? addPrice : editPrice
  const currentSetPrice = isNew ? setAddPrice : setEditPrice
  const currentIsLoading = isNew ? isAdding : isUpdating || isLoadingProduct

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isNew) {
      await addProduct({ title: currentTitle, price: +currentPrice })
    } else {
      await editProduct() // useEditProduct вже містить всю логіку оновлення
    }
  }

  // Індикація завантаження для режиму редагування
  if (!isNew && isLoadingProduct) {
    return <div className="text-center">Loading product data...</div>
  }

  return (
    <ProductForm
      isNew={isNew}
      title={currentTitle}
      onTitleChange={(e) => currentSetTitle(e.target.value.toLowerCase())}
      price={currentPrice}
      onPriceChange={(e) => currentSetPrice(e.target.value)}
      onSubmit={handleSubmit}
      isSubmitting={currentIsLoading}
    />
  );
}
