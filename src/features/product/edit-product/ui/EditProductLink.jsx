import { Link } from 'react-router'

export const EditProductLink = ({ productId }) => (
  <Link
    to={`/products/edit/${productId}`}
    className="px-4 py-1 rounded-lg bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-colors duration-150"
  >
    Edit
  </Link>
)
