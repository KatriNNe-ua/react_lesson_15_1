import React from 'react'
import { Link } from 'react-router' // Використовуйте react-router-dom для Link

export const AddProductButton = ({ className }) => {
  return (
    <Link
      to="/products/add"
      className={`inline-block px-6 py-2 rounded-lg bg-gradient-to-r  text-white font-semibold shadow  ${
        className || ''
      }`}
    >
      + Додати товар
    </Link>
  )
}
