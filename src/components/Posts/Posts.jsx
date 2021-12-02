import React, { useState, useEffect } from "react";
import userDB from "../../service/http";
import styles from "./Post.module.css";
import PostCard from "./PostCard/PostCard";

const Posts = ({ selectedUser }) => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      userDB
         .getExactData("posts", `?userId=${selectedUser.id}`)
         .then((result) => setPosts(result))
         .catch((error) => console.log("error", error));
   }, [selectedUser.id]);

   return (
      <div className={styles.postsWrap}>
         {selectedUser.id ? (
            <>
               <h1 className={styles.postcardUser}>
                  <span>{selectedUser.id}.</span>
                  <span>{selectedUser.username}</span>
                  <span>{selectedUser.email}</span>
               </h1>
               <div className={styles.postContent}>
                  {posts.map((post) => (
                     <PostCard
                        key={post.id}
                        post={post}
                        selectedUser={selectedUser}
                     />
                  ))}
               </div>
            </>
         ) : (
            <div className={styles.postcardNouser}>No user information..</div>
         )}
      </div>
   );
};

export default Posts;
