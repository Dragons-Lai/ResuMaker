import axios from "../../axios";

export async function login(account, password) {
  const {
    data: { message },
  } = await axios.post("/login", { account, password });
  // console.log(message);
  return message;
}

export async function register(userName, account, password) {
  const {
    data: { message },
  } = await axios.post("/register", { userName, account, password });
  // console.log(message);
  return message;
}

export async function logout() {
  await axios
    .post("/logout")
    .then((res) => {
      window.location = "/";
      // console.log("res", res);
    })
    .catch((err) => console.log("err", err));
}
