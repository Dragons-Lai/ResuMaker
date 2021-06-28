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
      <Row>
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
      </Row>
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
          <Meta description="Chunk Type2" />
        </Card>
      </Row>
    </div>
  );
}
