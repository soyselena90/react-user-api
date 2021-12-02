import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import CommonButton from "../../common/CommonButton/CommonButton";
import styles from "./Header.module.css";

const Header = ({ selectedUser }) => {
   const navigate = useNavigate();
   const buttonState = {
      classType: "register",
      content: "register",
      buttonType: "button",
      executer: () => navigate("/signup"),
   };
   return (
      <header className={styles.headerWrap}>
         <Link to="/">
            <h1>LooG</h1>
         </Link>
         {selectedUser.id && (
            <nav className={styles.nav}>
               <ul>
                  <li>
                     <Link to="/posts"> Posts</Link>
                  </li>
                  <li>
                     <Link to="/todos">Todos</Link>
                  </li>
                  <li>
                     <Link to="/albums"> Albums</Link>
                  </li>
               </ul>
            </nav>
         )}

         {selectedUser.username ? (
            <span className={styles.headerUser}>
               Hello, <em> {selectedUser.username}</em>
            </span>
         ) : (
            <CommonButton buttonState={buttonState} />
         )}
      </header>
   );
};

export default Header;
