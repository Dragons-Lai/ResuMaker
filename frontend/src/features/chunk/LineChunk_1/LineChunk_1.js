import { Divider } from "antd";

import "./LineChunk_1.css";

export default ({ chunk, id }) => {
  return (
    <div className="chunk" id={id}>
      <Divider></Divider>
    </div>
  );
};
