import { useDeleteProduct } from '@/features/product/delete-product/model/useDeleteProduct' // Імпортуємо хук з model

export const DeleteProductButton = ({ productId, className, onDeleted }) => {
  const { handleDeleteProduct, isLoading } = useDeleteProduct()

  const handleClick = async () => {
    // Просто викликаємо логіку з хука
    const success = await handleDeleteProduct(productId)
    if (success && onDeleted) {
      onDeleted(productId) // Викликаємо колбек, якщо операція успішна
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors ${
        className || ''
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? 'Deleting...' : 'Delete'}
    </button>
  )
}
