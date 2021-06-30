import { useSelector, useDispatch } from "react-redux";
import { insertChunk, sidebarSwitch, selectCurrentChunkId } from "./resumeSlice";
import { Button, Row, Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";

// const { Meta } = Card;

export default function Sidebar() {
  const dispatch = useDispatch();
  const currentChunkId = useSelector(selectCurrentChunkId);

  return (
    <div className="sidebar-open">
      <Row>
        <Button type="text" icon={<CloseOutlined />} onClick={() => dispatch(sidebarSwitch())} block />
      </Row>
      <Row>
        <Card
          hoverable
          cover={<img alt="type-1" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "_1", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType1"
          style={{ width: 180, margin: 10 }}
        ></Card>
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
        ></Card>
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
        ></Card>
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
        ></Card>
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
        ></Card>
      </Row>
      <Row>
        <Card
          hoverable
          cover={<img alt="type-6" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "lineChunk_1", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType6"
          style={{ width: 180, margin: 10 }}
        ></Card>
      </Row>
    </div>
  );
}
