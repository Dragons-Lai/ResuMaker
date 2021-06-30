import { useSelector } from "react-redux";
import { selectSidebarStatus } from "./resumeSlice";
import { Layout } from "antd";
import "../../styles/ResumeBody.css";
import "../../styles/scss/_navbar.scss";
import React from "react";

import { UpPadding, DownPadding } from "../chunk";
import { selectChunkIdList } from "./resumeSlice";
import Chunk from "./Chunk";
import Sidebar from "./Sidebar";

const { Sider, Content } = Layout;

export default function ResumeBody({ mode }) {
  const chunkIdList = useSelector(selectChunkIdList);
  // to make the sidebar collapsible
  const openSidebar = useSelector(selectSidebarStatus);

  const nothing = () => <></>;
  const sider = () => {
    return (
      <Sider
        theme="light"
        style={{
          overflow: "auto",
          height: "92vh",
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
