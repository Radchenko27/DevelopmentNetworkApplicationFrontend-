import React from 'react';
import { Link } from 'react-router-dom';



interface BreadcrumbProps {
    items: { label: string; path: string }[];
}


const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="breadcrumb">
            {items.map((item, index) => (
                <span key={index}>
                    <Link to={item.path} className="breadcrumb-link">{item.label}</Link>
                    {index < items.length - 1 && ' > '}
                </span>
            ))}
        </nav>
    );
};

export default Breadcrumb;

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import styles from "./Breadcrumb.module.css";

// const Breadcrumbs: React.FC = () => {
//     const location = useLocation();
//     const pathnames = location.pathname.split("/").filter((x) => x);

//     return (
//         <nav aria-label="breadcrumb">
//             <ol className={styles.breadcrumb}>
//                 {/* Главная страница */}
//                 <li className={styles.breadcrumb_item}>
//                     <Link to="/">Главная</Link>
//                 </li>
//                 {/* Динамические части пути */}
//                 {pathnames.map((value, index) => {
//                     const to = `/${pathnames.slice(0, index + 1).join("/")}`;
//                     const isLast = index === pathnames.length - 1;

//                     return isLast ? (
//                         <li key={to} className={`${styles.breadcrumb_item} ${styles.active}`} aria-current="page">
//                             {value}
//                         </li>
//                     ) : (
//                         <li key={to} className={styles.breadcrumb_item}>
//                             <Link to={to}>{value}</Link>
//                         </li>
//                     );
//                 })}
//             </ol>
//         </nav>
//     );
// };

// export default Breadcrumbs;