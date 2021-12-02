import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// styles
import styles from "./App.module.css";

// components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Users from "../Users/Users";
import SelectedUser from "../SelectedUser/SelectedUser";
import UserForm from "../UserForm/UserForm";
import Posts from "../Posts/Posts";
import Todos from "../Todos/Todos";
import Albums from "../Albums/Albums";
import Footer from "../Footer/Footer";

function App({ userDB }) {
   const [users, setUsers] = useState([]); // all user lists
   const [selectedUser, setSelectedUser] = useState([]); // a user clicked
   const [isOpen, setIsOpen] = useState(false); // modal

   // users data
   useEffect(() => {
      userDB
         .getData("users")
         .then((result) => setUsers(result))
         .catch((error) => console.log("User Data Error", error));
   }, [userDB]);

   //modal close
   const onClose = () => {
      setIsOpen(false);
   };

   return (
      <Router>
         <div className={styles.App}>
            <Header selectedUser={selectedUser} />
            <Routes>
               {/* main */}
               <Route
                  exact
                  path="/"
                  element={<Main setSelectedUser={setSelectedUser} />}
               />
               {/* user lists */}
               <Route
                  exact
                  path="/users"
                  element={
                     <Users
                        users={users}
                        setUsers={setUsers}
                        setSelectedUser={setSelectedUser}
                     />
                  }
               />
               {/* user detail - clicked user */}
               <Route
                  exact
                  path="/users/:userId"
                  element={
                     <SelectedUser
                        users={users}
                        setUsers={setUsers}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                     />
                  }
               />
               {/* user signup - clicked user */}
               <Route
                  exact
                  path="/signup"
                  element={
                     <UserForm users={users} selectedUser={selectedUser} />
                  }
               />
               {/* posts */}
               <Route
                  exact
                  path="/posts"
                  element={<Posts selectedUser={selectedUser} />}
               />
               {/* todos */}
               <Route
                  exact
                  path="/todos"
                  element={
                     <Todos
                        selectedUser={selectedUser}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        onClose={onClose}
                     />
                  }
               />
               {/*albums */}
               <Route
                  exact
                  path="/albums"
                  element={
                     <Albums
                        selectedUser={selectedUser}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        onClose={onClose}
                     />
                  }
               />
            </Routes>
            <Footer />
         </div>
      </Router>
   );
}

export default App;
