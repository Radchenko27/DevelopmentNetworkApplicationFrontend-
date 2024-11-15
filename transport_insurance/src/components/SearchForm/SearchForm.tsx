import React, { useState } from "react";
import styles from "./SearchForm.module.css";
interface SearchFormProps {
  onSearch: (searchQuery: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [DriverName, setDriverName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDriverName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(DriverName);
  };

  return (
    <div className={styles.search_block}>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          className={styles.search_input}
          name="driver_name"
          placeholder="Поиск по ФИО"
          value={DriverName}
          onChange={handleChange}
        />
        <button type="submit" className={styles.search_button}>
          Искать
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
