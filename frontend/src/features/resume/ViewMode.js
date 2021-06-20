import { useSelector, useDispatch } from "react-redux";
import {
  selectChunkIdList,
  selectChangeRecord,
  clearChangeRecord,
} from "./resumeSlice";
import Chunk from "./Chunk";
import Sidebar from "./Sidebar";
import { Layout } from "antd";
import { saveChunk } from "./api";
import "../../styles/ViewMode.css";

const { Header, Footer, Sider, Content } = Layout;

export default function ViewMode() {
  const dispatch = useDispatch();

  const chunkIdList = useSelector(selectChunkIdList);
  const changeRecord = useSelector(selectChangeRecord);
  return (
    <Layout>
      <Content>
        <div className="container">
          {chunkIdList.map((chunkId) => (
            <Chunk key={chunkId} id={chunkId} />
          ))}
          <button
            onClick={() => {
              saveChunk(chunkIdList, changeRecord).then(() =>
                dispatch(clearChangeRecord())
              );
            }}
          >
            save
          </button>
          {/* <button onClick={() => console.log("changeRecord", changeRecord)}>
            observe
          </button> */}
        </div>
      </Content>
      <Sider>
        <Sidebar />
      </Sider>
    </Layout>
  );
}
