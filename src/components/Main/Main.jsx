import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import CommonButton from "../../common/CommonButton/CommonButton";
import styles from "./Main.module.css";

const Main = ({ setSelectedUser }) => {
   const navigate = useNavigate();
   const buttonState = {
      classType: "mainButton",
      content: "Go Start ->",
      buttonType: "button",
      executer: () => navigate("/users"),
   };

   useEffect(() => {
      //main에서 selectedUser Empty
      setSelectedUser([]);
   }, [setSelectedUser]);
   return (
      <div className={styles.main}>
         <div className={styles.container}>
            <div className={`${styles.Green} ${styles.absolute}`}></div>
            <div className={`${styles.point} ${styles.absolute}`}></div>
            <div className={`${styles.Orange} ${styles.absolute}`}></div>
            <div className={`${styles.purple} ${styles.absolute}`}></div>
            <div className={`${styles.black} ${styles.absolute}`}>*😜</div>
            <div className={`${styles.black2} ${styles.absolute}`}>
               <em> * React</em> <em>& Users </em> <em>& by SY</em>
            </div>
            <div className={styles.btnWrap}>
               <CommonButton buttonState={buttonState} />
            </div>
         </div>
      </div>
   );
};

export default Main;
