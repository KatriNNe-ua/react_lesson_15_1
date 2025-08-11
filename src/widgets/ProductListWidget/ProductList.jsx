import { ProductCard } from '@/entities/product'

// Імпортуємо кнопки-дії з їх відповідних "фіч" (тепер з правильними шляхами)

import { EditProductLink } from "@/features/product/edit-product";
import { DeleteProductButton } from "@/features/product/delete-product";
import { AddToCartButton } from "@/features/cart";
// Імпортуємо наш перенесений компонент пагінації
import Pagination from './ui/Pagination' // Шлях відносно поточного файлу ProductList.jsx



export const ProductList = ({
  products,
  page,
  setPage,
  hasMore,
  isLoading,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Логіка відображення стану завантаження */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg text-gray-500 animate-pulse">
            Loading products...
          </p>
        </div>
      ) : (
        // Відображення списку продуктів або повідомлення, якщо немає товарів
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                actions={[
                  <EditProductLink
                    productId={product.id}
                    key={`edit-${product.id}`}
                  />,
                  // onDeleted тут не потрібен, оскільки RTK Query invalidatesTags автоматично оновлює список
                  <DeleteProductButton
                    productId={product.id}
                    key={`delete-${product.id}`}
                  />,
                  <AddToCartButton
                    product={product}
                    key={`add-to-cart-${product.id}`}
                  />,
                ]}
              />
            ))
          )}
        </div>
      )}

      {/* Пагінація рендериться всередині віджета ProductList */}
      {/* Вона буде відображатися, навіть якщо немає продуктів, дозволяючи перейти на іншу сторінку */}
      <div className="mt-8 flex justify-center">
        <Pagination page={page} setPage={setPage} hasMore={hasMore} />
      </div>
    </div>
  )
}
