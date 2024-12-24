import React, { useState } from "react";
import { Api } from "../../api/Api"; // Импортируем сгенерированный API
import { AxiosResponse } from "axios"; // Для уточнения типа ответа от сервера
import Navbar from "../../components/Navbar/Navbar";
import Breadcrumb from "../../components/Breadcrumb";
import IngosLogo from "../../components/Ingoslogo/Ingoslogo";
import CollapsibleMenu from "../../components/CollapsibleMenu/CollapsibleMenu"; // Импортируем компонент хлебной крошки
import styles from "./Register.module.css";
// import "../assets/style.css"; // Импортируем глобальные стили

const Register = () => {
  // Состояния для хранения значений формы
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  // Создаем экземпляр класса Api
  const api = new Api();

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Отправляем данные для регистрации
      const response: AxiosResponse<{ email?: string }> =
        await api.users.usersRegisterCreate({
          email,
          password,
        });

      if (response.data?.email) {
        setSuccess("Регистрация прошла успешно! Теперь вы можете войти.");
      } else {
        setError("Не удалось зарегистрировать пользователя. Попробуйте позже.");
      }
    } catch (err) {
      setError("Ошибка при регистрации. Попробуйте позже.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { name: "Главная", path: "/" },
    { name: "Список водителей", path: "/drivers" },
  ];

  return (
    <>
      <Navbar>
        <IngosLogo />
        <CollapsibleMenu menuItems={menuItems} />
      </Navbar>
      <div className={styles.services__container2}>
        <Breadcrumb
          items={[
            { label: "Главная", path: "/" },
            { label: "Регистрация", path: "/register" },
          ]}
        />
      </div>

      <div className={styles.register_container}>
        <h2>Регистрация</h2>
        {success ? (
          <p className={styles.success_message}>{success}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <p className={styles.error_message}>{error}</p>}

            <div className={styles.input_group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input_field}
              />
            </div>

            <div className={styles.input_group}>
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input_field}
              />
            </div>

            <div className={styles.input_group}>
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={styles.input_field}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.submit_btn}
            >
              {loading ? "Загрузка..." : "Зарегистрироваться"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Register;
