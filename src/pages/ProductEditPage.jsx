import { ProductEditFormWidget } from '@/widgets/ProductEditFormWidget'
import React from 'react'
import { useParams } from 'react-router'


export default function ProductEditPage() {
  const { id } = useParams() // Отримуємо ID з URL

  return (
    <div className="max-w-md mx-auto py-8">
      <ProductEditFormWidget productId={id} />
    </div>
  )
}
