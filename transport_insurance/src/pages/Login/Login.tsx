import React, { useState } from "react";
import { Api } from "../../api/Api"; // Импортируем API
import { useDispatch } from "react-redux"; // Для обновления состояния Redux
import { login } from "../../slices/authSlice"; // Action для сохранения логина
import Navbar from "../../components/Navbar/Navbar";
import IngosLogo from "../../components/Ingoslogo/Ingoslogo";
import CollapsibleMenu from "../../components/CollapsibleMenu/CollapsibleMenu";
import Breadcrumb from "../../components/Breadcrumb"; // Импортируем Breadcrumb
import { useNavigate } from "react-router-dom"; // Для навигации после успешного входа
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState<string>(""); // Поле email
  const [password, setPassword] = useState<string>(""); // Поле пароля
  const [error, setError] = useState<string>(""); // Ошибка
  const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки

  const dispatch = useDispatch(); // Используем dispatch для обновления Redux
  const api = new Api(); // Создаем экземпляр API
  const navigate = useNavigate(); // Хук для навигации

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.users.usersLoginCreate({ email, password });

      if (response.data?.session_id) {
        dispatch(
          login({ username: email, sessionId: response.data.session_id })
        );
        document.cookie = `sessionid=${response.data.session_id}; path=/; SameSite=Strict`;
        navigate("/"); // Перенаправляем на главную страницу после успешного входа
      } else {
        setError("Не удалось войти. Проверьте данные и попробуйте снова.");
      }
    } catch (err) {
      setError("Ошибка при аутентификации. Попробуйте позже.");
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
      <Breadcrumb
        items={[
          { label: "Главная", path: "/" },
          { label: "Вход", path: "/login" },
        ]}
      />
      <div className={styles.register_container}>
        <h2>Вход в систему</h2>
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

          <button
            type="submit"
            disabled={loading}
            className={styles.submit_btn}
          >
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
