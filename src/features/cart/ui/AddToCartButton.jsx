import { useDispatch } from 'react-redux'
import { addToCart } from '../model/cartSlice'

export const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addToCart(product))
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-1 rounded-lg bg-green-100 text-green-700 font-medium hover:bg-green-200 transition-colors duration-150"
    >
      Add to Cart
    </button>
  )
}
