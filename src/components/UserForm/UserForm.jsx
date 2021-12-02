import React, { useState, useEffect, memo } from "react";
import CommonButton from "../../common/CommonButton/CommonButton";
import CommonModal from "../../common/CommonModal/CommonModal";
import validateInfo from "../../Validate/Validate";
import styles from "./UserForm.module.css";

const UserForm = memo(({ users, selectedUser }) => {
   const [inputValue, setInputValue] = useState(selectedUser);
   const [errors, setErrors] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [modalContent, setModalContent] = useState("");

   const handleChange = (e) => {
      const { name, value } = e.target;
      setInputValue({
         ...inputValue,
         [name]: value,
         // const value = {...inputValue};
         // value["name"] = e.target.value;
         // setInputValue(value);
      });
   };

   // form send
   const onSubmitForm = (e) => {
      e.preventDefault();
      setErrors(validateInfo(inputValue));
      setIsSubmitting(true);
   };

   const onSave = () => {
      setIsOpen(true);
      selectedUser.username
         ? setModalContent("수정되었습니다👌.")
         : setModalContent("짝짝짝, 가입을 축하합니다🥳");
   };

   // check username duplication
   const checkUsername = (e) => {
      const usernameFilter = users.filter(
         (user) => user.username === inputValue.username
      );
      setIsOpen(true);

      if (inputValue.username === "" || inputValue.username === undefined) {
         // username 빈값
         setModalContent("입력을 아니하셨는데요..");
      } else if (usernameFilter.length === 0) {
         //같은 게 없을 때
         setModalContent("사용가능해요");
      } else if (usernameFilter.length === 1) {
         // 같은게 있을 때
         setModalContent("이미 사용중..");
      }
   };

   useEffect(() => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
         onSave();
      }
   }, [errors, isSubmitting]);

   const buttonState = {
      classType: "formButton",
      content: "Save",
      btnType: "submit",
      executer: null,
   };
   const signButtonState = { ...buttonState };
   signButtonState["content"] = "Sign Up";

   const usernameButtonState = {
      classType: "usernameButton",
      content: "Check!",
      btnType: "button",
      executer: checkUsername,
   };

   return (
      <>
         <div className={styles.userFormWrap}>
            <form className={styles.userForm} onSubmit={onSubmitForm}>
               <h1 className={styles.userFormTitle}>
                  {selectedUser?.username ? selectedUser.username : "REGISTER"}
               </h1>
               <div className={styles.inputWrap}>
                  <label htmlFor="name">name</label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     value={inputValue?.name ? inputValue.name : ""}
                     onChange={handleChange}
                     placeholder="name"
                  />
                  {errors?.name && (
                     <p className={styles.error}>{errors.name}</p>
                  )}
               </div>
               <div className={styles.inputWrap}>
                  <label htmlFor="username">username</label>
                  <input
                     type="text"
                     id="username"
                     name="username"
                     onChange={handleChange}
                     value={inputValue?.username ? inputValue.username : ""}
                     disabled={selectedUser?.username && "disabled"}
                     placeholder="username"
                  />
                  {errors?.username && (
                     <p className={styles.error}>{errors.username}</p>
                  )}
                  {selectedUser?.username ? (
                     <div
                        className={`${styles.usernameButton} ${styles.disabledButton}`}
                     >
                        수정불가
                     </div>
                  ) : (
                     <div className={styles.usernameButton}>
                        <CommonButton buttonState={usernameButtonState} />
                     </div>
                  )}
               </div>
               <div className={styles.inputWrap}>
                  <label htmlFor="email">email</label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     onChange={handleChange}
                     value={inputValue?.email ? inputValue.email : ""}
                     placeholder="email"
                  />
                  {errors?.email && (
                     <p className={styles.error}>{errors.email}</p>
                  )}
               </div>
               <div className={styles.inputWrap}>
                  <label htmlFor="phone">phone</label>
                  <input
                     type="tel"
                     id="phone"
                     name="phone"
                     onChange={handleChange}
                     value={inputValue?.phone ? inputValue.phone : ""}
                     placeholder="phone"
                  />
                  {errors?.phone && (
                     <p className={styles.error}>{errors.phone}</p>
                  )}
               </div>
               <div className={styles.inputWrap}>
                  <label htmlFor="website">website</label>
                  <input
                     type="text"
                     id="website"
                     name="website"
                     onChange={handleChange}
                     value={inputValue?.website ? inputValue.website : ""}
                     placeholder="website"
                  />
                  {errors?.website && (
                     <p className={styles.error}>{errors.website}</p>
                  )}
               </div>
               <CommonButton
                  buttonState={
                     selectedUser?.username ? buttonState : signButtonState
                  }
               />
            </form>
         </div>
         <CommonModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            modalContent={modalContent}
         />
      </>
   );
});

export default UserForm;
