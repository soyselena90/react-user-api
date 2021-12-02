import React from "react";
import ReactDom from "react-dom";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./CommonModalAlbum.module.css";

const CommonModalAlbum = ({ photos, isOpen, onClose, getAlbumTitle }) => {
   //ReactDOM.createPortal(child, container) portal 생성
   //child -> renderable React Child (element, string,fragment..)
   //container -> DOM element
   if (!isOpen) return null;

   const buttonState = {
      classType: "deleteComments",
      content: "X",
      btnType: "button",
      executer: onClose,
   };

   return ReactDom.createPortal(
      <>
         <div className={styles.modalAblumWrap}>
            <div className={styles.albumContainer}>
               <div className={styles.albumHeader}>
                  <h1>{getAlbumTitle}</h1>
                  <div className={styles.closeButtonWrap}>
                     <CommonButton buttonState={buttonState} />
                  </div>
               </div>
               <div className={styles.photoWrap}>
                  <ul className={styles.photoContainer}>
                     {photos.map((photo) => (
                        <div className={styles.imgbox} key={photo.id}>
                           <img src={photo.url} alt={photo.title} />
                        </div>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </>,
      document.getElementById("modal")
   );
};

export default CommonModalAlbum;
