import "../../styles/HomePage.css";
import HomePageImage from "./homepage.jpg";
import { Button } from "antd";
import { Row, Col } from "react-bootstrap";


const BackGroundStyle = {
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${HomePageImage})`,
  backgroundSize: "cover",
};


function HomePage() {
  return (
    <div className="homepage" style={BackGroundStyle}>
      <Row className="button-group">
        <Button
          className="button"
          onClick={() => (window.location = "/login")}
          type="primary"
          size="large"
        >
          LOGIN
        </Button>
        <Button
          className="button"
          onClick={() => (window.location = "/register")}
          type="primary"
          size="large"
        >
          REGISTER
        </Button>
      </Row>
      <h1>
        Welcome to
        <br />
        ResuMaker.com!
      </h1>
    </div>
  );
}

export default HomePage;
