import { useSelector, useDispatch } from "react-redux";
import { insertChunk, sidebarSwitch, selectCurrentChunkId } from "./resumeSlice";
import bpchunk1Img from "../../img/sidebar/bpchunk1.png";
import bpchunk2Img from "../../img/sidebar/bpchunk2.png";
import titleImg from "../../img/sidebar/title.png";
import contentImg from "../../img/sidebar/content.png";
import lineImg from "../../img/sidebar/line.png";
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
          cover={<img alt="type-2" src={bpchunk1Img} />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "bpChunk_1", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType2"
          style={{ width: 900, margin: 10 }}
        >
          <Meta description="列點式（樣式一）" />
        </Card>
      </Row>
      <Row>
        <Card
          hoverable
          cover={<img alt="type-3" src={bpchunk2Img} />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "bpChunk_2", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType3"
          style={{ width: 180, margin: 10 }}
        >
          <Meta description="列點式（樣式二）" />
        </Card>
      </Row>
      <Row>
        <Card
          hoverable
          cover={<img alt="type-4" src={titleImg} />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "mtChunk_1", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType4"
          style={{ width: 180, margin: 10 }}
        >
          <Meta description="標題" />
        </Card>
      </Row>
      <Row>
        <Card
          hoverable
          cover={<img alt="type-5" src={contentImg} />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "mcChunk_1", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType5"
          style={{ width: 180, margin: 10 }}
        >
          <Meta description="任意文字" />
        </Card>
      </Row>
      <Row>
        <Card
          hoverable
          cover={<img alt="type-6" src={lineImg} />}
          onClick={() => {
            dispatch(insertChunk(currentChunkId, "lineChunk_1", "down"));
            dispatch(sidebarSwitch());
          }}
          className="sidebarChunkType6"
          style={{ width: 180, margin: 10 }}
        >
          <Meta description="直線" />
        </Card>
      </Row>
    </div>
  );
}
