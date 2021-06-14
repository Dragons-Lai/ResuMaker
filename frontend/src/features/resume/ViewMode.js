import { useSelector } from "react-redux";

import { selectChunkIdList } from "./resumeSlice";
import Chunk from "./Chunk";
import Sidebar from "./sidebar";
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;


export default function ViewMode() {
  const chunkIdList = useSelector(selectChunkIdList);

  return (
    <Layout>
      <Content>
      <div className="container">
        {chunkIdList.map((chunkId) => (
          <Chunk key={chunkId} id={chunkId} />
        ))}
      </div>
      </Content>
      <Sider>
        <Sidebar/>
      </Sider>
    </Layout>
  );
}
