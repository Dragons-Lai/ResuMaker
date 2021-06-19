import axios from "../../axios";

export async function login(account, password){
  await axios.post("/login", {account, password})
  .then((res)=>{console.log("res", res)})
  .catch((err) => console.log("err", err))
}

export async function register(userName, account, password){
  await axios.post("/register", {userName, account, password})
  .then((res)=>{console.log("res", res)})
  .catch((err) => console.log("err", err))
}

export async function logout(){
  await axios.post("/logout")
  .then((res)=>{console.log("res", res)})
  .catch((err) => console.log("err", err))
}