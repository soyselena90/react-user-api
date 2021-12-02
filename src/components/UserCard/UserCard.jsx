import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonButton from "../../common/CommonButton/CommonButton";
import CommonModal from "../../common/CommonModal/CommonModal";
import styles from "./UserCard.module.css";

const UserCard = ({ user, users, index, setUsers, setSelectedUser }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [modalContent, setModalContent] = useState("");
   const [isDelete, setIsDelete] = useState(false);
   const navigate = useNavigate();
   const moveTo = () => {
      navigate("/signup");
      setSelectedUser(user);
   };

   const onCheckToDelete = () => {
      setIsOpen(true);
      setIsDelete(true);
      setModalContent("Are you sure?");
   };
   const onDelete = () => {
      const allUsers = [...users];
      allUsers.splice(index, 1);
      setUsers(allUsers);
   };
   const buttonState = {
      classType: "userCardButton",
      content: "edit",
      buttonType: "button",
      executer: moveTo,
   };
   const delButtonState = { ...buttonState };
   delButtonState["content"] = "delete";
   delButtonState["executer"] = onCheckToDelete;

   useEffect(() => {
      setSelectedUser(user.id);
   }, [setSelectedUser, user.id]);

   return (
      <li className={styles.cardList}>
         <div className={styles.userCard}>
            <Link to={`/users/${user.id}`}>
               <ul className={styles.userInfo}>
                  <li>{user.id}</li>
                  <li>{user.name}</li>
                  <li>{user.username}</li>
                  <li>{user.email}</li>
                  <li>{user.phone}</li>
                  <li>{user.website}</li>
               </ul>
            </Link>
            <div className={styles.userBtnWrap}>
               <CommonButton buttonState={buttonState} />
               <CommonButton buttonState={delButtonState} />
            </div>
         </div>
         <CommonModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onDelete={onDelete}
            modalContent={modalContent}
            isDelete={isDelete}
         />
      </li>
   );
};

export default UserCard;
