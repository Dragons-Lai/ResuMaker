import { useDispatch } from "react-redux";
import { ArrowUpOutlined, ArrowDownOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";

import { deleteChunk, moveUpChunk, moveDownChunk, sidebarSwitch } from "../../resume/resumeSlice";

export default function ({ chunkId, position }) {
  const dispatch = useDispatch();

  return (
    <div className={`buttonMenu`}>
      <Divider className="chunk-btn-group">
        <Button value="small" type="text" icon={<PlusOutlined />} onClick={() => dispatch(sidebarSwitch(chunkId))}>
          New
        </Button>
        <Button value="small" type="text" icon={<DeleteOutlined />} onClick={() => dispatch(deleteChunk(chunkId))}>
          Delete
        </Button>
        <Button value="small" type="text" icon={<ArrowUpOutlined />} onClick={() => dispatch(moveUpChunk(chunkId))} />
        <Button value="small" type="text" icon={<ArrowDownOutlined />} onClick={() => dispatch(moveDownChunk(chunkId))} />
      </Divider>
    </div>
  );
}
