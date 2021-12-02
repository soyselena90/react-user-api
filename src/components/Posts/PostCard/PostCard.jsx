import React, { useEffect, useRef, useState } from "react";
import CommonButton from "../../../common/CommonButton/CommonButton";
import userDB from "../../../service/http";
import CommentsCard from "../Comments/CommentsCard";
import styles from "./PostCard.module.css";

const PostCard = ({ post, selectedUser }) => {
   const [comments, setComments] = useState([]);
   const [isOpenComments, setIsOpenComments] = useState(false);
   const [errors, setErrors] = useState(null);
   const formRef = useRef();
   const commentRef = useRef();

   const handleComments = (e) => {
      setErrors(null);
   };

   const fillComment = (e) => {
      e.preventDefault();
      if (commentRef.current.value === "") {
         setErrors("Please Enter Comments");
      } else {
         const newComment = {
            id: Date.now(),
            postId: Date.now(),
            name: selectedUser.name,
            email: selectedUser.name,
            body: commentRef.current.value,
            // milliseconds 밀리초(1/1000 초) 후의 시점이 저장된 Date 객체가 반환
            // name: nameRef.current.value,
            // email: emailRef.current.value,
         };
         formRef.current.reset();
         addComment(newComment);
      }
   };

   const addComment = (newComment) => {
      const updateComment = [...comments, newComment];
      setComments(updateComment);
   };

   useEffect(() => {
      userDB
         .getExactData("comments", `?postId=${post.id}`)
         .then((result) => setComments(result))
         .catch((error) => console.log("error", error));
   }, [post.id]);

   const buttonState = {
      classType: "comments",
      content: "comments",
      buttonType: "button",
      executer: () => setIsOpenComments(!isOpenComments),
   };

   const commentButtonState = {
      classType: "addComments",
      content: "Ok",
      buttonType: "submit",
      executer: null,
   };

   return (
      <li>
         <div className={styles.postcardWrap}>
            <p className={`${styles.postcardId} ${styles.postcardcontent}`}>
               <em>post number :</em>
               <span>{post.id}</span>
            </p>
            <p className={`${styles.postcardTitle} ${styles.postcardcontent}`}>
               <em>title :</em>
               <span>{post.title}</span>
            </p>

            <p className={`${styles.postcardBody} ${styles.postcardcontent}`}>
               <em>content :</em>
               <span>{post.body}</span>
            </p>
            <div className={styles.commentButton}>
               <CommonButton buttonState={buttonState} />
            </div>
            {isOpenComments && (
               <>
                  <div className={styles.commentsWrap}>
                     <ul className={styles.commentUl}>
                        {comments.map((comment) => (
                           <CommentsCard
                              key={comment.id}
                              comment={comment}
                              selectedUser={selectedUser}
                           />
                        ))}
                     </ul>
                  </div>
                  <div className={styles.addComment}>
                     <div className={styles.userComment}>
                        <span>{selectedUser.username}</span>
                        <span>{selectedUser.email}</span>
                     </div>
                     <form
                        className={styles.postCommentInput}
                        onSubmit={fillComment}
                        ref={formRef}
                     >
                        <label htmlFor="commentPost">comment :</label>
                        <textarea
                           cols="2"
                           rows="10"
                           type="text"
                           id="commentPost"
                           name="commentPost"
                           placeholder="Enter your comments.."
                           onChange={handleComments}
                           ref={commentRef}
                        />
                        {errors && (
                           <p className={styles.commentError}>{errors}</p>
                        )}
                        <CommonButton buttonState={commentButtonState} />
                     </form>
                  </div>
               </>
            )}
         </div>
      </li>
   );
};

export default PostCard;
