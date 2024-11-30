import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./CollapsibleMenu.css"; // Подключение стилей
import { Link } from 'react-router-dom';
interface MenuItem {
  name: string;
  path: string;
}

interface CollapsibleMenuProps {
  menuItems: MenuItem[];
}

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState); // Переключение состояния меню
  };

  return (
    <div className="menu-container">
      <a href="#" className="header__button">
        Текущая страховка недоступна
      </a>
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
                  <Link  className="nav_link_r" to={item.path}>{item.name}</Link>
                </Nav.Item>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CollapsibleMenu;
