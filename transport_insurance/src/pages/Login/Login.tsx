import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { loginUser } from "../../slices/authSlice";
import Navbar from "../../components/Navbar/Navbar";
import IngosLogo from "../../components/Ingoslogo/Ingoslogo";
import CollapsibleMenu from "../../components/CollapsibleMenu/CollapsibleMenu";
import Breadcrumb from "../../components/Breadcrumb";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
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
            { label: "Вход", path: "/login" },
          ]}
        />
      </div>

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
            disabled={isLoading}
            className={styles.submit_btn}
          >
            {isLoading ? "Загрузка..." : "Войти"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
