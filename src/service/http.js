import axios from "axios";
import userAPi from "../utils/API";

// instance 생성
const httpUser = axios.create({
   baseURL: "https://jsonplaceholder.typicode.com/",
   // params: {key : process.env.REACT_APP_~~}
});

const userDB = new userAPi(httpUser); // 객체생성

export default userDB;
