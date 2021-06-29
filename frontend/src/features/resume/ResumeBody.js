import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSidebarStatus } from "./resumeSlice";
import { Col, Row, Layout, Space, Button, Avatar } from "antd";
import { SaveOutlined, HomeTwoTone, UserOutlined } from "@ant-design/icons";
import "../../styles/ResumeBody.css";
import "../../styles/scss/_navbar.scss";
import React from "react";
import { Link } from "react-router-dom";

import { VIEW_MODE, EDIT_MODE } from "./config";
import { UpPadding, DownPadding } from "../chunk"
import { selectChunkIdList, selectChangeRecord, clearChangeRecord } from "./resumeSlice";
import Chunk from "./Chunk";
import Sidebar from "./Sidebar";
import { saveChunk, getUserName } from "./api";
import { logout } from "../homePage/api";

const { Header, Sider, Content } = Layout;

export default function ResumeBody({ mode, setMode }) {
  const dispatch = useDispatch();

  const chunkIdList = useSelector(selectChunkIdList);
  const changeRecord = useSelector(selectChangeRecord);
  // to make the sidebar collapsible
  const openSidebar = useSelector(selectSidebarStatus);
  const [userName, setUserName] = useState("")

  useEffect(() => {
    getUserName().then((res) => {
      setUserName(res)
    })
  }, [])


  const nothing = () => <></>;
  const sider = () => {
    return (
      <Sider
        theme="light"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <Sidebar />
      </Sider>
    );
  };

  const modeOppsite = {}
  modeOppsite[EDIT_MODE] = VIEW_MODE
  modeOppsite[VIEW_MODE] = EDIT_MODE

  const changeModeText = {}
  changeModeText[EDIT_MODE] = "View"
  changeModeText[VIEW_MODE] = "Edit"

  return (
    <Layout>
      <Header>
        <Row>
          <Col span={8}>
            <Space size="small">
              <Link to="/">
                <Button className=" navbar-button-group home-button" icon={<HomeTwoTone />} />
              </Link>
              <Button
                className="save-button"
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => {
                  saveChunk(chunkIdList, changeRecord).then(() => dispatch(clearChangeRecord()));
                }}
              >
                Save
              </Button>
              <Button type="primary" onClick={() => setMode(modeOppsite[mode])}>
                {changeModeText[mode]}
              </Button>
            </Space>
          </Col>
          <Col span={12} />
          <Col span={2}>
            <div className="user-name-row">
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
              <p className="user-name">{userName}</p>
            </div>
          </Col>
          <Col span={2}>
            <Button className="logout-button" type="primary" onClick={() => logout()}>
              Logout
            </Button>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Content>
          <div className="protector-container">
            <div className={`chunk-container ${mode}`}>
              <UpPadding></UpPadding>
              {chunkIdList.map((chunkId) => {
                return <Chunk key={chunkId} id={chunkId} mode={mode} />;
              })}
              <DownPadding></DownPadding>
            </div>
            <div className={`view-mode-protector ${mode}`}></div>
          </div>
        </Content>
        {React.createElement(openSidebar ? sider : nothing)}
      </Layout>
    </Layout >
  );
}
