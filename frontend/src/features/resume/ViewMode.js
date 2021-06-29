import { useSelector, useDispatch } from "react-redux";
import { selectSidebarStatus } from "./resumeSlice";
import { Col, Row, Layout, Space, Button, Avatar } from "antd";
import { SaveOutlined, HomeTwoTone, UserOutlined } from "@ant-design/icons";
import "../../styles/ViewMode.css";
import "../../styles/scss/_navbar.scss";
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
          left: 0,
        }}
      >
        <Sidebar />
      </Sider>
    );
  };

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
            </Space>
          </Col>
          <Col span={12} />
          <Col span={2}>
            Welcome
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
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
