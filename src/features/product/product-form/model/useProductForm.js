import { useState, useEffect } from 'react'

export const useProductForm = (initialTitle = '', initialPrice = '') => {
  const [title, setTitle] = useState(initialTitle)
  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    setTitle(initialTitle)
    setPrice(initialPrice)
  }, [initialTitle, initialPrice]) // Залежності: реагуємо на зміну початкових значень

  return {
    title,
    setTitle,
    price,
    setPrice,
  }
}
