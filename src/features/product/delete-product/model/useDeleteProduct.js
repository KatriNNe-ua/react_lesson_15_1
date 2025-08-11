import { useDeleteProductMutation } from '@/entities/product' // Імпортуємо мутацію з entities/product/model

export const useDeleteProduct = () => {
  const [deleteProductMutation, { isLoading, error }] =
    useDeleteProductMutation()

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProductMutation(productId).unwrap()
        console.log(`Product ${productId} deleted successfully.`)
        return true
      } catch (e) {
        console.error('Failed to delete product:', e)
        return false
      }
    }
    return false
  }

  return { handleDeleteProduct, isLoading, error }
}
