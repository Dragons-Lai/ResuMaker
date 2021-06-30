import { Divider } from "antd";

export default ({ chunk, id }) => {
  return (
    <div className="chunk" id={id}>
      <Divider></Divider>
    </div>
  );
};
