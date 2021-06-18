import { useSelector } from "react-redux";
import { selectChunkIdList, selectChangeRecord } from "./resumeSlice";
import Chunk from "./Chunk";
import Sidebar from "./Sidebar";
import { Layout } from "antd";
import { saveChunk } from "./axios";
import "../../styles/ViewMode.css";

const { Header, Footer, Sider, Content } = Layout;

export default function ViewMode() {
  const chunkIdList = useSelector(selectChunkIdList);
  const changeRecord = useSelector(selectChangeRecord);
  let user_id = "Dragon's UserId"; // index.js跟ViewMode.js的user_id要一起改
  return (
    <Layout>
      <Content>
        <div className="container">
          {chunkIdList.map((chunkId) => (
            <Chunk key={chunkId} id={chunkId} />
          ))}
          <button onClick={() => saveChunk(user_id, chunkIdList, changeRecord)}>
            save
          </button>
        </div>
      </Content>
      <Sider>
        <Sidebar />
      </Sider>
    </Layout>
  );
}
