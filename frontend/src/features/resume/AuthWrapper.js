import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

export default function AuthWrapper({ children }) {
  const cookies = new Cookies();
  const isLogin = cookies.get("isLogin");

  if (!isLogin) return <Redirect to="/" />;
  else return children;
}
