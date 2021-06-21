import { useSelector, useDispatch } from "react-redux";
import { sidebarSwitch } from "./resumeSlice";
import { selectSidebarStatus } from "./resumeSlice";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export default function Sidebar() {
  const openSidebar = useSelector(selectSidebarStatus);
  const dispatch = useDispatch();

  return openSidebar ? (
    <div className="sidebar">
      <Button icon={<CloseOutlined />} onClick={() => dispatch(sidebarSwitch())} />
    </div>
  ) : null;
}
