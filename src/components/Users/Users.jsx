import React, { useState } from "react";
import styles from "./Users.module.css";
import UserCard from "../UserCard/UserCard";
import Search from "../Search/Search";

const Users = ({ users, setUsers, setSelectedUser }) => {
   const [isSearch, setIsSearch] = useState(false);

   return (
      <div className={styles.container}>
         <Search
            users={users}
            setUsers={setUsers}
            setSelectedUser={setSelectedUser}
            setIsSearch={setIsSearch}
         />
         {!isSearch && (
            <ul className={styles.usersWrap}>
               {users.map((user, index) => (
                  <UserCard
                     key={user.id}
                     user={user}
                     users={users}
                     index={index}
                     setUsers={setUsers}
                     setSelectedUser={setSelectedUser}
                  />
               ))}
            </ul>
         )}
      </div>
   );
};

export default Users;
