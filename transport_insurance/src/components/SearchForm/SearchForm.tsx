import React, { useState } from "react";
import styles from "./SearchForm.module.css";


// import { RootState } from "../../store";
// import { setDriverName } from "../../slices/dataSlice";

interface SearchFormProps {
  onSearch: (searchQuery: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  // const dispatch = useDispatch();
  // const driverName = useSelector(
  //   (state: RootState) => state.ourData.driverName
  // );
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
          // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          //   dispatch(setDriverName(event.target.value)); // Получаем значение из event.target.value
          // }}
        />
        <button type="submit" className={styles.search_button}>
          Искать
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

// import React from "react";
// import styles from "./SearchForm.module.css";

// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import { setDriverName } from '../../slices/dataSlice';

// interface SearchFormProps {
//   onSearch: (searchQuery: string, event:React.FormEvent) => void;
// }

// const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
//   const dispatch = useDispatch();

//   // Используем useSelector для получения значения из Redux
//   const driverName = useSelector((state: RootState) => state.ourData.driverName);

//   // Функция для изменения значения фильтра в Redux
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(setDriverName(event.target.value)); // Обновляем состояние Redux
//   };

//   // Функция для отправки формы
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     onSearch(driverName, event); // Отправляем значение в родительский компонент
//   };

//   return (
//     <div className={styles.search_block}>
//       <form onSubmit={handleSubmit} className={styles.search_form}>
//         <input
//           type="text"
//           className={styles.search_input}
//           name="driver_name"
//           placeholder="Поиск по ФИО"
//           value={driverName || ""} // Привязываем значение из Redux
//           onChange={handleChange} // Обрабатываем изменение
//         />
//         <button type="submit" className={styles.search_button}>
//           Искать
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchForm;
