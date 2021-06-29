import { useSelector, useDispatch } from "react-redux";
import { selectSidebarStatus } from "./resumeSlice";
import { Layout, Menu, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import "../../styles/ResumeBody.css";
import React from "react";
import { Link } from "react-router-dom";

import { VIEW_MODE, EDIT_MODE } from "./config";
import { UpPadding, DownPadding } from "../chunk"
import { selectChunkIdList, selectChangeRecord, clearChangeRecord } from "./resumeSlice";
import Chunk from "./Chunk";
import Sidebar from "./Sidebar";
import { saveChunk } from "./api";
import { logout } from "../homePage/api";

const { Header, Sider, Content } = Layout;

export default function ResumeBody({ mode, setMode }) {
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

  const modeOppsite = {}
  modeOppsite[EDIT_MODE] = VIEW_MODE
  modeOppsite[VIEW_MODE] = EDIT_MODE

  const changeModeText = {}
  changeModeText[EDIT_MODE] = "View"
  changeModeText[VIEW_MODE] = "Edit"

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
              }}>
              Save
            </Button>
          </Menu.Item>
          <Menu.Item key="logout">
            <Button type="primary" onClick={() => logout()}>
              Logout
            </Button>
          </Menu.Item>
          <Menu.Item key="editMode">
            <Button type="primary" onClick={() => setMode(modeOppsite[mode])}>
              {changeModeText[mode]}
            </Button>
          </Menu.Item>
        </Menu>
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
    </Layout>
  );
}
