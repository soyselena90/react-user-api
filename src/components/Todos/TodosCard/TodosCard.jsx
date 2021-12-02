import React, { useState } from "react";
import CommonButton from "../../../common/CommonButton/CommonButton";
import styles from "./TodosCard.module.css";

const TodosCard = ({ todo, index, todos, setTodos, selectedUser }) => {
   // const todoRef = useRef();
   // const deleteTodos = () => {
   //    todoRef.current.remove();
   // };

   const [isClick, setIsClick] = useState(false);
   const onTodosClick = () => {
      setIsClick(!isClick);
   };
   const removeTodos = () => {
      const copyTodos = [...todos];
      copyTodos.splice(index, 1);
      setTodos(copyTodos);
   };
   const changeToTrue = () => {
      todo.completed = true;
      setIsClick(false);
   };
   const buttonState = {
      classType: "deleteComments todoDeleteButton",
      content: "X",
      buttonType: "button",
      executer: removeTodos,
   };
   const buttonState2 = {
      classType: "changeTrueButton",
      content: "Change to True",
      buttonType: "button",
      executer: changeToTrue,
   };

   return (
      <>
         <div className={styles.todoCardWrap} onClick={onTodosClick}>
            {/* <div className={styles.todoCardWrap} ref={todoRef}> */}
            <p>{todo.id}</p>
            <p>{todo.title}</p>
            <p>{todo.completed.toString()}</p>
            {todo.userId === selectedUser.id && (
               <div className={styles.todoButton}>
                  <CommonButton buttonState={buttonState} />
               </div>
            )}
         </div>
         {isClick && todo.completed === false && (
            <div className={styles.areyoudone}>
               <p>Are you Done?</p>
               <CommonButton buttonState={buttonState2} />
            </div>
         )}
      </>
   );
};

export default TodosCard;
