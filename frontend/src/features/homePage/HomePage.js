import "../../styles/HomePage.css";
import HomePageImage from "./homepage.jpg";
import { Button } from "antd";
import { Row } from "react-bootstrap";
import Cookies from "universal-cookie";
import { logout } from "./api";

const BackGroundStyle = {
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${HomePageImage})`,
  backgroundSize: "cover",
};

function HomePage() {
  const cookies = new Cookies();
  const isLogin = cookies.get("isLogin");

  var button_group;

  if (isLogin)
    button_group = (
      <Row className="button-group">
        <Button
          className="button"
          onClick={() => {
            logout();
          }}
          type="primary"
          size="large"
        >
          LOGOUT
        </Button>
        <Button className="button" onClick={() => (window.location = "/resume")} type="primary" size="large">
          RESUME
        </Button>
      </Row>
    );
  else
    button_group = (
      <Row className="button-group">
        <Button className="button" onClick={() => (window.location = "/login")} type="primary" size="large">
          LOGIN
        </Button>
        <Button className="button" onClick={() => (window.location = "/register")} type="primary" size="large">
          REGISTER
        </Button>
      </Row>
    );

  return (
    <div className="homepage" style={BackGroundStyle}>
      {button_group}
      <h1>
        Welcome to
        <br />
        ResuMaker.com!
      </h1>
    </div>
  );
}

export default HomePage;
