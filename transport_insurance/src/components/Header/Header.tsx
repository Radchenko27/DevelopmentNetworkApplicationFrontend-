import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import IngosLogo from "../Ingoslogo/Ingoslogo";
import styles from "./Header.module.css";
const Header: React.FC = () => {
  return (
    <div className={styles.above__header__сontainer}>
      <div className={styles.above__header}>
        {/* <IngosLogo /> */}
      </div>
    </div>
  );
};

export default Header;
