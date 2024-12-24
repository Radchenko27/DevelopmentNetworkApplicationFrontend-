import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { updateUserInfo } from "../../slices/authSlice";
import { Api, CustomUser } from "../../api/Api";
import { RequestParams } from "../../api/Api";
import Breadcrumbs from "../../components/Breadcrumb";
import IngosLogo from "../../components/Ingoslogo/Ingoslogo";
import NavBar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import CollapsibleMenu from "../../components/CollapsibleMenu/CollapsibleMenu";
import style from "./Profile.module.css";
import axios from "axios";

const Profile: React.FC = () => {
  const username = useSelector((state: RootState) => state.auth.user?.username);
  const email = useSelector((state: RootState) => state.auth.user?.email);
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);

  const dispatch = useDispatch();
  const api = new Api();

  const [newEmail, setNewEmail] = useState<string>(email || "");
  const [newPassword, setNewPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Обработчик обновления данных пользователя
  const handleUpdateUser = async () => {
    try {
      // if (!sessionId) {
      //   alert("Не найден session_id. Пожалуйста, войдите снова.");
      //   return;
      // }
      // Устанавливаем session_id в куки (без HttpOnly)
      // document.cookie = `session_id=${sessionId}; path=/; SameSite=Strict`;

      const userData: CustomUser = {
        email: newEmail || "",
        password: newPassword || "", // Если пароль не меняется, передаем пустую строку
      };

      // Выполняем запрос на обновление данных пользователя
      // const response = await api.users.usersUpdateUpdate(userData, {
      //   withCredentials: true, // Передаем куки с запросом
      // } as RequestParams);
      console.log(newEmail, newPassword);
      const response = await axios.put(
        `http://localhost:8000/users/update/`,
        {
          email: newEmail,
          password: newPassword,
        },
        { withCredentials: true }
      );
      localStorage.setItem("email", newEmail);
      if (response.status === 200) {
        // Если запрос успешен, обновляем email в Redux
        dispatch(updateUserInfo({ email: newEmail }));
        alert("Данные успешно обновлены!");
      } else {
        // Если ошибка на сервере, выводим сообщение
        throw new Error("Ошибка при обновлении данных.");
      }
    } catch (err) {
      // В случае ошибки, выводим сообщение об ошибке
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
        {/* <p>Добро пожаловать, {username || 'гость'}!</p> */}

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
