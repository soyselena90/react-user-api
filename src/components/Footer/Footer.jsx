import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
   return (
      <footer className={styles.footerWrap}>
         <Link to="/">
            <h1>LooG</h1>
         </Link>
         <p>COPYRIGHT ⓒ 2021 ㈜따블류따블류 ALL RIGHTS RESERVED</p>
      </footer>
   );
};

export default Footer;
