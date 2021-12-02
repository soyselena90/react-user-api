import React, { useEffect, useRef, useState } from "react";
import CommonButton from "../../common/CommonButton/CommonButton";
import CommonModal from "../../common/CommonModal/CommonModal";
import userDB from "../../service/http";
import styles from "./Todos.module.css";
import TodosCard from "./TodosCard/TodosCard";

const Todos = ({ selectedUser, isOpen, onClose, setIsOpen }) => {
   const [todos, setTodos] = useState([]); // use this
   const [allTodos, setAllTodos] = useState([]); //original
   // const [completeTodos, setCompleteTodos] = useState([]); //after filter(true)
   const [inputChecked, setInputChecked] = useState(false);
   const [modalContent, setModalContent] = useState("");
   const formRef = useRef();
   const inputRef = useRef();

   const onCompleteTodos = (e) => {
      const isChecked = e.target.checked;
      if (isChecked) {
         const filterTodosTrue = todos.filter(
            (todos) => todos.completed === true
         );
         setTodos(filterTodosTrue);
         setInputChecked(true);
      } else {
         setTodos(allTodos);
         setInputChecked(false);
      }
   };

   const onAddTodos = (e) => {
      e.preventDefault();
      const addValue = inputRef.current.value;
      if (addValue === "") {
         setIsOpen(true);
         setModalContent("No add Todos..");
      } else {
         const newTodos = {
            id: Date.now(),
            userId: selectedUser.id,
            title: inputRef.current.value,
            completed: false,
         };
         formRef.current.reset();
         onAddList(newTodos);
      }
   };

   const onAddList = (newTodos) => {
      const addTodo = [...todos, newTodos];
      setTodos(addTodo);
   };

   const buttonState = {
      classType: "addTodos",
      content: "Add",
      buttonType: "submit",
      executer: null,
   };

   useEffect(() => {
      userDB
         .getExactData("todos", `?userId=${selectedUser.id}`)
         .then((result) => {
            // const filterTodosTrue = result.filter(
            //    (result) => result.completed === true
            // );
            setTodos(result);
            setAllTodos(result);
            // setCompleteTodos(filterTodosTrue);
         })
         .catch((error) => console.log("error", error));
   }, [selectedUser.id]);

   return (
      <>
         <div className={styles.todosWrap}>
            {selectedUser.id ? (
               <>
                  <h1 className={styles.todosUser}>
                     <span>{selectedUser.id}.</span>
                     <span>{selectedUser.username}</span>
                     <span>{selectedUser.email}</span>
                  </h1>
                  <form
                     className={styles.addTodoForm}
                     onSubmit={onAddTodos}
                     ref={formRef}
                  >
                     <input
                        ref={inputRef}
                        type="text"
                        placeholder="What's next?"
                     />
                     <CommonButton buttonState={buttonState} />
                  </form>
                  <div className={styles.todosCheck}>
                     <input
                        type="checkbox"
                        id="trueCheck"
                        name="trueCheck"
                        onClick={onCompleteTodos}
                     />
                     <label htmlFor="trueCheck">
                        {!inputChecked ? "TRUE" : "SEE ALL"}
                     </label>
                  </div>
                  <div className={styles.todosContents}>
                     {todos.map((todo, index) => (
                        <TodosCard
                           key={todo.id}
                           todo={todo}
                           todos={todos}
                           index={index}
                           setTodos={setTodos}
                           selectedUser={selectedUser}
                        />
                     ))}
                  </div>
               </>
            ) : (
               <div className={styles.todosNouser}>No user information😱</div>
            )}
         </div>
         <CommonModal
            isOpen={isOpen}
            onClose={onClose}
            modalContent={modalContent}
         />
      </>
   );
};

export default Todos;
