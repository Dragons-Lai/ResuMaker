import { useSelector, useDispatch } from "react-redux";
import { selectSidebarStatus } from "./resumeSlice";
import { Layout, Menu, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import "../../styles/ViewMode.css";
import React from "react";
import { Link } from "react-router-dom";

import { selectChunkIdList, selectChangeRecord, clearChangeRecord } from "./resumeSlice";
import Chunk from "./Chunk";
import Sidebar from "./Sidebar";
import { saveChunk } from "./api";
import { logout } from "../homePage/api";

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
      <Sider
        theme="light"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          right: 0,
        }}
      >
        <Sidebar />
      </Sider>
    );
  };

  return (
    <Layout>
      <Header>
        <Menu mode="horizontal">
          <Menu.Item key="thomepage">
            <Link to="/">Homepage</Link>
          </Menu.Item>
          <Menu.Item key="save">
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
          <Menu.Item key="logout">
            <Button type="primary" onClick={() => logout()}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content>
          <div className="container">
            {chunkIdList.map((chunkId) => {
              return <Chunk key={chunkId} id={chunkId} />;
            })}
          </div>
        </Content>
        {React.createElement(openSidebar ? sider : nothing)}
      </Layout>
    </Layout>
  );
}
