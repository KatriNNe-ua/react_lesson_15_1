// === src/pages/ProductsPage/ui.jsx ===
import { useState, useEffect } from 'react'
import { useGetProductsQuery } from '@/entities/product' // Шлях до productApi в entities

// Імпортуємо наш віджет ProductList
//import { ProductList } from '@/widgets/ProductListWidget/ProductList'
import { ProductList } from "@/widgets/ProductListWidget";

// Імпортуємо нову кнопку з фічі add-product
//import { AddProductButton } from '@/features/product/add-product/ui/AddProductButton'
import { AddProductButton } from "@/features/product/add-product";

import {
  useFilterForm,
  FilterProductInput,
} from "@/features/product/filter-product";



export default function ProductsPage() {
  const [page, setPage] = useState(1)
  const [cursors, setCursors] = useState([])
  const perPage = 6

 const {
   titleUser,
   onTitleChange,
 } = useFilterForm();

  // Логіка запиту даних
  const { data, isLoading } = useGetProductsQuery({
    page,
    perPage,
    cursors,
    searchValue: titleUser,
  });

const products = data?.data || [];

  const hasMore = data?.hasMore

 
  // Логіка для курсорів та зменшення сторінки при порожньому результаті
  useEffect(() => {
    if (data?.cursor && cursors.length < page) {
      setCursors((prev) => [...prev, data.cursor])
    }
    if (data?.data.length === 0 && page > 1) {
      setPage((p) => p - 1)
    }
  }, [data, cursors?.length, page])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Products List</h2>
        {/* Використовуємо кнопку з фічі */}
        <AddProductButton />
        <FilterProductInput
          titleUser={titleUser}
          onTitleChange={onTitleChange}
        />
      </div>

     <ProductList
        products={products}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
        isLoading={isLoading }
      /> 
   
    </div>
  );
}
