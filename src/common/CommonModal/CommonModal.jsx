import React from "react";
import ReactDom from "react-dom";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./CommonModal.module.css";

const CommonModal = ({ isOpen, onClose, modalContent, onDelete, isDelete }) => {
   //ReactDOM.createPortal(child, container) portal 생성
   //child -> renderable React Child (element, string,fragment..)
   //container -> DOM element
   if (!isOpen) return null;

   const buttonState = {
      classType: "modal",
      content: "OK",
      btnType: "button",
      executer: onClose,
   };
   // cancel button
   const buttonState2 = { ...buttonState };
   buttonState2["content"] = "Cancel";

   //yes delete button
   const buttonState3 = { ...buttonState };
   buttonState3["executer"] = onDelete;

   return ReactDom.createPortal(
      <>
         <div className={styles.modalWrap}>
            <div className={styles.modalContent}>
               <p className={styles.modlatext}>{modalContent}</p>
               <div className={styles.modalButtonWrap}>
                  {!isDelete ? (
                     <CommonButton buttonState={buttonState} />
                  ) : (
                     <>
                        <CommonButton buttonState={buttonState3} />
                        <CommonButton buttonState={buttonState2} />
                     </>
                  )}
               </div>
            </div>
         </div>
      </>,
      document.getElementById("modal")
   );
};

export default CommonModal;
