import { useSelector, useDispatch } from "react-redux";
import { insertChunk, sidebarSwitch, selectCurrentChunkId } from "./resumeSlice";
import { Button, Row, Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Meta } = Card;

export default function Sidebar() {
  const dispatch = useDispatch();
  const currentChunkId = useSelector(selectCurrentChunkId);

  return (
    <div className="sidebar-open">
      <Row>
        <Button type="text" icon={<CloseOutlined />} onClick={() => dispatch(sidebarSwitch())} block />
      </Row>
      {/* <Row>
        <Card
          hoverable
          cover={<img alt="type-1" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "type1", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType1"
          style={{ width: 180, margin: 10 }}
        >
          <Meta description="Chunk Type1" />
        </Card>
      </Row> */}
      <Row>
        <Card
          hoverable
          cover={<img alt="type-1" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "infoChunk_1", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType1"
          style={{ width: 180, margin: 10 }}
        >
          <Meta description="infoChunk_1" />
        </Card>
      </Row>
      <Row>
        <Card
          hoverable
          cover={<img alt="type-2" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "bpChunk_1", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType2"
          style={{ width: 180, margin: 10 }}
        >
          <Meta description="bpChunk_1" />
        </Card>
      </Row>
      <Row>
        <Card
          hoverable
          cover={<img alt="type-3" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "bpChunk_2", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType3"
          style={{ width: 180, margin: 10 }}
        >
          <Meta description="bpChunk_2" />
        </Card>
      </Row>
      <Row>
        <Card
          hoverable
          cover={<img alt="type-4" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "mtChunk_1", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType4"
          style={{ width: 180, margin: 10 }}
        >
          <Meta description="mtChunk_1" />
        </Card>
      </Row>
      <Row>
        <Card
          hoverable
          cover={<img alt="type-5" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "mcChunk_1", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType5"
          style={{ width: 180, margin: 10 }}
        >
          <Meta description="mcChunk_1" />
        </Card>
      </Row>
    </div>
  );
}
