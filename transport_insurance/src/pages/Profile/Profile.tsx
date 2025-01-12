import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { updateUser } from "../../slices/ProfileSlice";
import Breadcrumbs from "../../components/Breadcrumb";
import IngosLogo from "../../components/Ingoslogo/Ingoslogo";
import NavBar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import CollapsibleMenu from "../../components/CollapsibleMenu/CollapsibleMenu";
import style from "./Profile.module.css";

const Profile: React.FC = () => {
  const email = useSelector((state: RootState) => state.profile.email);
  const dispatch = useDispatch();

  const [newEmail, setNewEmail] = useState<string>(email || "");
  const [newPassword, setNewPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Обработчик обновления данных пользователя
  const handleUpdateUser = async () => {
    try {
      const response = await dispatch(
        updateUser({ email: newEmail, password: newPassword })
      );

      // Проверяем статус обновления данных
      if (updateUser.fulfilled.match(response)) {
        alert("Данные успешно обновлены!");
      } else {
        setErrorMessage("Ошибка при обновлении данных. Попробуйте позже.");
      }
    } catch (err) {
      setErrorMessage("Ошибка при обновлении данных. Попробуйте позже.");
      console.error(err);
    }
  };

  const menuItems = [
    { name: "Главная", path: "/" },
    { name: "Список водителей", path: "/drivers" },
  ];

  return (
    <>
      <Header />
      <NavBar>
        <IngosLogo />
        <CollapsibleMenu menuItems={menuItems} />
      </NavBar>
      <div className={style.register_container}>
        <h2>Личный кабинет</h2>
        <div className={style.update_form}>
          {errorMessage && (
            <p className={style.error_message}>{errorMessage}</p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateUser();
            }}
          >
            <div className={style.input_group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                className={style.input_field}
                placeholder="Введите новый email"
              />
            </div>

            <div className={style.input_group}>
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={style.input_field}
                placeholder="Введите новый пароль (если нужно)"
              />
            </div>

            <button type="submit" className={style.submit_btn}>
              Обновить данные
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
