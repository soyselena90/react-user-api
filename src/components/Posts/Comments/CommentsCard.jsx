import React, { useRef } from "react";
import CommonButton from "../../../common/CommonButton/CommonButton";
import styles from "./CommentsCard.module.css";

const CommentsCard = ({ comment, selectedUser }) => {
   const commentRef = useRef();
   const deleteComment = () => {
      commentRef.current.remove();
   };
   const buttonState = {
      classType: "deleteComments",
      content: "X",
      buttonType: "button",
      executer: deleteComment,
   };
   return (
      <div className={styles.commentCardWrap} ref={commentRef}>
         <div className={styles.commentId}>
            <p>{comment.name}</p>
            <p>{comment.email}</p>
         </div>
         <div className={styles.commentBody}>
            <p>{comment.body}</p>
         </div>
         {comment.name === selectedUser.name && (
            <div className={styles.commentCloseButton}>
               <CommonButton buttonState={buttonState} />
            </div>
         )}
      </div>
   );
};

export default CommentsCard;
