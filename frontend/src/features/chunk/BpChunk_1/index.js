import { useDispatch } from "react-redux";
import { Button, Input, Row } from "antd";

import { updateChunk } from "../../resume/resumeSlice";
import "./BpChunk_1.css";
import { PlusOutlined, DeleteFilled } from "@ant-design/icons";

const { TextArea } = Input;

const BUTTON_MENU_STYLE = {
  fontSize: "1em",
};

export default ({ chunk, id }) => {
  const dispatch = useDispatch();

  return (
    <div className="bpchunk_1 chunk" id={id}>
      {chunk.value.text.map((element, index) => {
        return (
          <div className="bpchunk_1-container" key={index}>
            <div className="bpchunk_1 textarea">
              <TextArea autoSize={{ maxRows: 100 }} bordered={false} className="title" value={element[0]} onChange={(e) => dispatch(updateChunk(id, e.target.value, ["title", index]))} />
              <TextArea autoSize={{ maxRows: 100 }} bordered={false} className="content" value={element[1]} onChange={(e) => dispatch(updateChunk(id, e.target.value, ["content", index]))} />
            </div>
            <Row className="hover-button-menu2">
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
        );
      })}
    </div>
  );
};
