import axios from "../../axios";

export async function login(account, password) {
  const {
    data: { message },
  } = await axios.post("/login", { account, password });
  return message;
}

export async function register(userName, account, password) {
  const {
    data: { message },
  } = await axios.post("/register", { userName, account, password });
  return message;
}

export async function logout() {
  await axios
    .post("/logout")
    .then((res) => {
      window.location = "/";
    })
    .catch((err) => console.log("err", err));
}
