export const FilterProductInput=({ titleUser, onTitleChange }) =>{
  return (
    <input
      type="search"
      placeholder="
Search..."
      value={titleUser}
      onChange={onTitleChange}
      className="
        w-full
        max-w-md
        px-4
        py-2
        border
        border-gray-300
        rounded-lg
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-blue-500
        placeholder-gray-400
        text-sm
        transition
      "
    />
  );
}


