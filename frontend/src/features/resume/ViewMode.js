import { useSelector } from "react-redux";
import { selectSidebarStatus } from "./resumeSlice";
import { selectChunkIdList, selectChangeRecord } from "./resumeSlice";
import Chunk from "./Chunk";
import Sidebar from "./Sidebar";
import { Layout, Menu, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { saveChunk } from "./axios";
import "../../styles/ViewMode.css";
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function ViewMode() {
  const chunkIdList = useSelector(selectChunkIdList);
  const changeRecord = useSelector(selectChangeRecord);
  let user_id = "Dragon's UserId"; // index.js跟ViewMode.js的user_id要一起改

  // to make the sidebar collapsible
  const openSidebar = useSelector(selectSidebarStatus);
  const nothing = () => <></>;
  const sider = () => {
    return (
      <Sider theme="light">
        <Sidebar />
      </Sider>
    );
  };

  return (
    <Layout>
      <Header>
        <Menu mode="horizontal">
          <Menu.Item key="login-link">
            <Link to="/">Login</Link>
          </Menu.Item>
          <Menu.Item key="resume-editor">
            <Link to="/resume">Resume</Link>
          </Menu.Item>
          <Menu.Item>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => saveChunk(user_id, chunkIdList, changeRecord)}
            >
              Save
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content>
          <div className="container">
            {chunkIdList.map((chunkId) => (
              <Chunk key={chunkId} id={chunkId} />
            ))}
          </div>
        </Content>
        {React.createElement(openSidebar ? sider : nothing)}
      </Layout>
    </Layout>
  );
}
