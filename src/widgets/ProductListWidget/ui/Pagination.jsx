export default function Pagination({ page, setPage, hasMore }) {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        ◀ Prev
      </button>
      <span className="text-lg">Page {page}</span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={!hasMore}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next ▶
      </button>
    </div>
  )
}
