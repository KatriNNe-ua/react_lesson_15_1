export const ProductForm = ({
  title, // Поточне значення заголовка
  onTitleChange, // Обробник зміни заголовка
  price, // Поточне значення ціни
  onPriceChange, // Обробник зміни ціни
  onSubmit, // Обробник подачі форми
  isNew, // Прапор, що вказує, чи це нова форма (для заголовка "Add" / "Edit")
  isSubmitting, // Прапор, що вказує, чи відбувається процес подачі форми (для деактивації полів/кнопки)
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-md">
      <h2 className="text-xl">{isNew ? 'Add' : 'Edit'} Product</h2>
      <input
        value={title}
        onChange={onTitleChange}
        placeholder="Title"
        className="border p-2 w-full"
        disabled={isSubmitting} // Деактивуємо поля під час сабміту
      />
      <input
        value={price}
        onChange={onPriceChange}
        placeholder="Price"
        type="number"
        className="border p-2 w-full"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}
