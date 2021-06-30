import { useDispatch } from "react-redux";
import { Button, Input, Row, Col } from "antd";

import { updateChunk } from "../../resume/resumeSlice";
import "./BpChunk_2.css";
import { PlusOutlined, DeleteFilled } from "@ant-design/icons";

const { TextArea } = Input;

const BUTTON_MENU_STYLE = {
  fontSize: "1em",
};

export default ({ chunk, id }) => {
  const dispatch = useDispatch();

  return (
    <div className="bpchunk_2 chunk" id={id}>
      <Row>
        {chunk.value.text.map((element, index) => {
          return (
            <Col span={24 / chunk.value.text.length} key={index}>
              <div className="bpchunk_2-container">
                <div className="bpchunk_2 textarea">
                  <TextArea autoSize={{ maxRows: 1000 }} bordered={false} className="title" value={element[0]} onChange={(e) => dispatch(updateChunk(id, e.target.value, ["title", index]))} />
                  <TextArea autoSize={{ maxRows: 1000 }} bordered={false} className="content" value={element[1]} onChange={(e) => dispatch(updateChunk(id, e.target.value, ["content", index]))} />
                </div>
                <Row className="hover-button-menu3">
                  <Button
                    type="primary"
                    onClick={() => {
                      dispatch(updateChunk(id, "", ["insert", index]));
                    }}
                    icon={<PlusOutlined style={BUTTON_MENU_STYLE} />}
                  ></Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      dispatch(updateChunk(id, "", ["delete", index]));
                    }}
                    icon={<DeleteFilled style={BUTTON_MENU_STYLE} />}
                  ></Button>
                </Row>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
