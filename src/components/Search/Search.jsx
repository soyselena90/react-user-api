import React, { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import styles from "./Search.module.css";

const Search = ({ users, setUsers, setSelectedUser, setIsSearch }) => {
   const [filteredResults, setFilteredResults] = useState([]); // 검색 일치 결과 저장
   const [searchInput, setSearchInput] = useState(""); // 내가 입력한 값

   //onchange 입력 받은 값을 가져옴 ,
   const searchItems = (e) => {
      const searchValue = e.target.value;
      setSearchInput(searchValue);
      if (searchInput !== "") {
         const filteredData = users.filter((user) => {
            return Object.values(user)
               .join("")
               .toLowerCase()
               .includes(searchInput.toLowerCase());
         });
         setIsSearch(true);
         setFilteredResults(filteredData);
      } else {
         setFilteredResults(users);
      }
   };

   //original user lists show or not
   useEffect(() => {
      if (searchInput === "") setIsSearch(false);
   }, [searchInput, setIsSearch]);

   return (
      <>
         <div className={styles.searchWrap}>
            <input
               type="search"
               id="search"
               placeholder="Enter username.."
               onChange={searchItems}
            />
            <label htmlFor="search">Search</label>
         </div>
         <div className={styles.searchContent}>
            {searchInput.length > 1 &&
               filteredResults.map((user, index) => {
                  return (
                     <UserCard
                        key={user.id}
                        user={user}
                        users={users}
                        index={index}
                        setUsers={setUsers}
                        setSelectedUser={setSelectedUser}
                     />
                  );
               })}
         </div>
      </>
   );
};

export default Search;
