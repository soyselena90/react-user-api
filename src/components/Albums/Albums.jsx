import React, { useState, useEffect } from "react";
import userDB from "../../service/http";
import styles from "./Albums.module.css";
import AlbumsCard from "./AlbumsCard/AlbumsCard";
import CommonModalAlbum from "../../common/CommonModalAlbum/CommonModalAlbum";

const Albums = ({ selectedUser, isOpen, setIsOpen, onClose }) => {
   const [albums, setAlbums] = useState([]);
   const [photos, setPhotos] = useState([]);
   const [getAlbumTitle, setGetAlbumTitle] = useState("");

   useEffect(() => {
      userDB
         .getExactData("albums", `?userId=${selectedUser.id}`)
         .then((result) => setAlbums(result))
         .catch((error) => console.log("error", error));
   }, [selectedUser.id]);

   return (
      <div className={styles.ablumsWrap}>
         {selectedUser.id ? (
            <>
               <h1 className={styles.albumsUsers}>
                  <span>{selectedUser.id}.</span>
                  <span>{selectedUser.username}</span>
                  <span>{selectedUser.email}</span>
               </h1>
               <div className={styles.albumContent}>
                  {albums.map((album) => (
                     <AlbumsCard
                        key={album.id}
                        album={album}
                        setPhotos={setPhotos}
                        setIsOpen={setIsOpen}
                        setGetAlbumTitle={setGetAlbumTitle}
                     />
                  ))}
               </div>
               <CommonModalAlbum
                  photos={photos}
                  isOpen={isOpen}
                  onClose={onClose}
                  getAlbumTitle={getAlbumTitle}
               />
            </>
         ) : (
            <div className={styles.noAlbumsUsers}>No user information..</div>
         )}
      </div>
   );
};

export default Albums;
