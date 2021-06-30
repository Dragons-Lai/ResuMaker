import { useDispatch } from "react-redux";
import { Input } from "antd";

import { updateChunk } from "../../resume/resumeSlice";
import "./McChunk_1.css";
const { TextArea } = Input;

export default ({ chunk, id }) => {
  const dispatch = useDispatch();
  return (
    <div className="chunk" id={id}>
      <div className="textarea">
        <TextArea autoSize={{ maxRows: 1000 }} bordered={false} className="maincontent" value={chunk.value.text} onChange={(e) => dispatch(updateChunk(id, e.target.value, []))} />
      </div>
    </div>
  );
};
