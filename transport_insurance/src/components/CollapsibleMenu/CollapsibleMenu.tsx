import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./CollapsibleMenu.css"; // Подключение стилей
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { RequestParams, Api } from "../../api/Api";
import { logout } from "../../slices/authSlice";
import { resetDataState } from "../../slices/dataSlice";
import axios from "axios";

interface MenuItem {
  name: string;
  path: string;
}

interface CollapsibleMenuProps {
  menuItems: MenuItem[];
  children?: React.ReactNode;
}
const api = new Api();
const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({
  // menuItems,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const QuantityOfDrivers = useSelector(
    (state: RootState) => state.ourData.QuantityOfDrivers
  );
  const draftInsuranceId = useSelector(
    (state: RootState) => state.ourData.draftInsuranceId
  );
  const sessionId = useSelector((state: RootState) => state.auth.sessionId); // Получаем sessionId
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState); // Переключение состояния меню
  };
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      setMenuItems([
        { name: "Главная", path: "/" },
        { name: "Список водителей", path: "/drivers" },
        { name: "Профиль", path: "/profile" },
        { name: "Мои страховки", path: "/insurances" },
      ]);
    } else {
      setMenuItems([
        { name: "Главная", path: "/" },
        { name: "Вход", path: "/login" },
        { name: "Ренистрация", path: "/register" },
      ]);
    }
  }, [isAuthenticated]);
  const handleLogout = async () => {
    try {
      //   document.cookie = `sessionid=${sessionId}; path=/; SameSite=Strict`;

      //   const deleteSessionCookie = () => {
      //     // document.cookie = `sessionid=${sessionId}; path=/; SameSite=Strict; Secure; HttpOnly`;
      //   };
      // Запрос на выход из системы
      const response = await axios.post(
        "http://localhost:8000/users/logout/",
        { owner: 1 },
        {
          withCredentials: true, // Передаем куки с запросом
        }
      );

      if (response && response.status === 200) {
        // Удаляем куки после успешного выхода
        // deleteSessionCookie();
        dispatch(logout()); // Обновляем Redux-состояние
        dispatch(resetDataState());
        localStorage.setItem("isAuthenticated", "false");
        localStorage.removeItem("email");
        console.log("Выход выполнен успешно");
      } else {
        throw new Error("Ошибка при выходе: неверный ответ от сервера");
      }
    } catch (err) {
      console.error("Ошибка при выходе:", err);
      alert("Ошибка при выходе. Попробуйте позже.");
    }
  };

  return (
    <>
    <div>{localStorage.getItem("email")}</div>
      <div className="menu-container">
        {children}
        <Navbar bg="light" expand="lg">
          <Container>
            {/* <Navbar.Brand href="#">Menu</Navbar.Brand> */}
            <Navbar.Toggle
              aria-controls="navbar-nav"
              onClick={toggleMenu}
              className={`menu-toggle ${isOpen ? "open" : ""}`}
            />
            <Navbar.Collapse
              id="navbar-nav"
              className={`menu ${isOpen ? "show" : ""}`}
            >
              <Nav className="nav_link">
                {menuItems.map((item, index) => (
                  <Nav.Item key={index}>
                    <Link className="nav_link_r" to={item.path}>
                      {item.name}
                    </Link>
                  </Nav.Item>
                ))}
              </Nav>
              <Nav className="nav_link"></Nav>
              <Nav className="nav_link">
                {localStorage.getItem("isAuthenticated") === "true" && (
                  <Link
                    className="nav_link_r_2"
                    to="/" // Укажите путь для перенаправления после выхода
                    onClick={(e) => {
                      e.preventDefault(); // Предотвращаем стандартное поведение ссылки (если нужно)
                      handleLogout(); // Выполняем вашу функцию выхода
                    }}
                  >
                    Выйти
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default CollapsibleMenu;
