
import { useState } from "react";

export const useFilterForm = () => {
  const [titleUser, setTitleUser] = useState("");

  const onTitleChange = async (e) => {
    const value = e.target.value.toLowerCase();
    setTitleUser(value);
  };

  return { titleUser, onTitleChange};
};

