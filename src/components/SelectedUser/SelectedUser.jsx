import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import CommonButton from "../../common/CommonButton/CommonButton";
import userDB from "../../service/http";
import styles from "./SelectedUser.module.css";

const SelectedUser = ({ users, setUsers, selectedUser, setSelectedUser }) => {
   const items = [
      "id",
      "name",
      "username",
      "email",
      "address",
      "phone",
      "website",
      "company",
   ];
   const { userId } = useParams();
   const navigate = useNavigate();
   const buttonState = {
      classType: "userCardButton selectedButton",
      content: "edit",
      buttonType: "button",
      executer: () => navigate("/signup"),
   };
   function deleteElem() {
      navigate("/users");
      const filterUser = users.filter((user) => user.id !== selectedUser.id);
      setUsers(filterUser);
   }
   const delButtonState = { ...buttonState };
   delButtonState["content"] = "delete";
   delButtonState["executer"] = deleteElem;

   useEffect(() => {
      userDB
         .getData("users", `${userId}`)
         .then((result) => setSelectedUser(result[0]))
         .catch((error) => console.log("seleceted User Error", error));
   }, [userId, setSelectedUser]);

   return (
      <div className={styles.selectedUserWrap}>
         {selectedUser?.id ? (
            <>
               <h1 className={styles.selectedTitle}>
                  Hi, {selectedUser.username} 🖐
               </h1>
               <div className={styles.selectedContent}>
                  <ul className={styles.category}>
                     {items.map((item, index) => (
                        <li key={index}>{item}</li>
                     ))}
                  </ul>
                  <ul className={styles.userDetail}>
                     <li>{selectedUser.id}</li>
                     <li>{selectedUser.name}</li>
                     <li>{selectedUser.username}</li>
                     <li>{selectedUser.email}</li>
                     <li>
                        <span>{selectedUser.address?.street}</span>
                        <span>{selectedUser.address?.suite}</span>
                        <span>{selectedUser.address?.city}</span>
                        <span>{selectedUser.address?.zipcode}</span>
                     </li>
                     <li>{selectedUser.phone}</li>
                     <li>{selectedUser.website}</li>
                     <li>{selectedUser.company?.name}</li>
                  </ul>
               </div>
               <div className={styles.selectedBtnWrap}>
                  <CommonButton buttonState={buttonState} />
                  <CommonButton buttonState={delButtonState} />
               </div>
            </>
         ) : (
            <div className={styles.loading}>Loading...🤓🤓</div>
         )}
      </div>
   );
};

export default SelectedUser;
