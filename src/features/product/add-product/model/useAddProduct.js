import { useAddProductMutation } from '@/entities/product'
import { useNavigate } from 'react-router'

export const useAddProduct = () => {
  const [addProductMutation, { isLoading, error }] = useAddProductMutation()
  const navigate = useNavigate()

  const addProduct = async (productData) => {
    try {
      await addProductMutation(productData).unwrap()
      navigate('/products')
      return true
    } catch (e) {
      console.error('Failed to add product:', e)
      return false
    }
  }

  return { addProduct, isLoading, error }
}
