import { useSelector, useDispatch } from "react-redux";
import {
  insertChunk,
  deleteChunk,
  updateChunk,
  moveUpChunk,
  moveDownChunk,
  sidebarSwitch,
} from "./resumeSlice";
import { selectChunkById } from "./resumeSlice";
import { Button, Input } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  DeleteOutlined,
  BarsOutlined,
} from "@ant-design/icons";

export default function Chunk({ id }) {
  const chunk = useSelector(selectChunkById(id));
  const dispatch = useDispatch();

  switch (chunk.type) {
    case "type1":
      return (
        <div>
          <p>{chunk.value.text}</p>
          <Button
            icon={<PlusOutlined />}
            onClick={() => dispatch(insertChunk(id, "type1", "up"))}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => dispatch(deleteChunk(id))}
          />
          <Button
            icon={<ArrowUpOutlined />}
            onClick={() => dispatch(moveUpChunk(id))}
          />
          <Button
            icon={<ArrowDownOutlined />}
            onClick={() => dispatch(moveDownChunk(id))}
          />
          <Button
            icon={<BarsOutlined />}
            onClick={() => dispatch(sidebarSwitch())}
          />
          <Input
            type="text"
            onChange={(event) => dispatch(updateChunk(id, event.target.value))}
          />
        </div>
      );

    default:
      return false;
  }
}
