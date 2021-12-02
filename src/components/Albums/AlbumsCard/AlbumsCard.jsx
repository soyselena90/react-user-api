import React from "react";
import userDB from "../../../service/http";
import styles from "./AlbumsCard.module.css";
import CommonButton from "../../../common/CommonButton/CommonButton";

const AlbumsCard = ({ album, setIsOpen, setPhotos, setGetAlbumTitle }) => {
   const onAlbums = () => {
      setIsOpen(true);
      getPhotos();
      setGetAlbumTitle(album.title);
   };
   const buttonState = {
      classType: "albumPhotoButton",
      content: "Photos",
      buttonType: "button",
      executer: onAlbums,
   };
   const getPhotos = () => {
      userDB
         .getExactData("photos", `?albumId=${album.id}`)
         .then((result) => setPhotos(result))
         .catch((error) => console.log("error", error));
   };

   return (
      <>
         <div className={styles.albumCardWrap}>
            <p>{album.id}</p>
            <p>{album.title}</p>
            <div className="albumButton">
               <CommonButton buttonState={buttonState} />
            </div>
         </div>
      </>
   );
};

export default AlbumsCard;
