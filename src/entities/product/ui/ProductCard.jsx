import { Fragment } from 'react'

export function ProductCard({ product, actions }) {
  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-white to-gray-50 shadow hover:shadow-lg transition-shadow duration-200">
      <h3
        className="font-bold text-xl text-gray-800 mb-2 truncate"
        title={product.title}
      >
        {product.title}
      </h3>
      <p className="mb-4 text-gray-600 text-base">
        <span className="font-semibold text-indigo-600">${product.price}</span>
      </p>
      <div className="mt-auto flex gap-2">
        {/* Рендеримо дії, передані через пропси */}
        {actions &&
          actions.map((action, index) => (
            <Fragment key={index}>{action}</Fragment>
          ))}
      </div>
    </div>
  )
}
