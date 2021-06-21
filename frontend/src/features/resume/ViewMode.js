import { useSelector, useDispatch } from "react-redux";
import { selectSidebarStatus } from "./resumeSlice";
import { selectChunkIdList, selectChangeRecord, clearChangeRecord } from "./resumeSlice";
import Chunk from "./Chunk";
import Sidebar from "./Sidebar";
import { Layout, Menu, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { saveChunk } from "./api";
import "../../styles/ViewMode.css";
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { logout } from "../homepage/api";

const { Header, Sider, Content } = Layout;

export default function ViewMode() {
  const dispatch = useDispatch();

  const chunkIdList = useSelector(selectChunkIdList);
  const changeRecord = useSelector(selectChangeRecord);
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
            <Link to="/">Homepage</Link>
          </Menu.Item>
          <Menu.Item>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => {
                saveChunk(chunkIdList, changeRecord).then(() => dispatch(clearChangeRecord()));
              }}
            >
              Save
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button type="primary" onClick={() => logout()}>
              Logout
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
