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
// import { TITLE, DURATION, COMPANY, DESCRIPTION } from "./constants";
import { Button, Input, Divider } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  DeleteOutlined,
  BarsOutlined,
} from "@ant-design/icons";

// const { TextArea } = Input;

export default function Chunk({ id }) {
  const chunk = useSelector(selectChunkById(id));
  const dispatch = useDispatch();

  switch (chunk.type) {
    case "type1":
      return (
        <div className="chunk chunk-type1">
          <p>{chunk.value.text}</p>
          <Input
            type="text"
            onChange={(event) => dispatch(updateChunk(id, event.target.value))}
            allowClear
            placeholder="Text"
            bordered={false}
          />
          <Divider className="chunk-btn-group">
            <Button
              icon={<PlusOutlined />}
              onClick={() => dispatch(insertChunk(id, "type1", "down"))}
            >
              New
            </Button>
            <Button icon={<DeleteOutlined />} onClick={() => dispatch(deleteChunk(id))}>
              Delete
            </Button>
            <Button icon={<ArrowUpOutlined />} onClick={() => dispatch(moveUpChunk(id))} />
            <Button icon={<ArrowDownOutlined />} onClick={() => dispatch(moveDownChunk(id))} />
            <Button icon={<BarsOutlined />} onClick={() => dispatch(sidebarSwitch())} />
          </Divider>
        </div>
      );
    // case "type2":
    //   return(
    //     <div className="chunk only-h2">
    //       <h2>{chunk.value.text}</h2>
    //       <Input
    //         type="text"
    //         onChange={(event) => dispatch(updateChunk(id, event.target.value))}
    //       />
    //       <Divider className="chunk-btn-group">
    //         <Button
    //           icon={<PlusOutlined />}
    //           onClick={() => dispatch(insertChunk(id, "type3", "down"))}
    //         >New</Button>
    //         <Button
    //           icon={<DeleteOutlined />}
    //           onClick={() => dispatch(deleteChunk(id))}
    //         >Delete</Button>
    //         <Button
    //           icon={<ArrowUpOutlined />}
    //           onClick={() => dispatch(moveUpChunk(id))}
    //         />
    //         <Button
    //           icon={<ArrowDownOutlined />}
    //           onClick={() => dispatch(moveDownChunk(id))}
    //         />
    //         <Button
    //           icon={<BarsOutlined />}
    //           onClick={() => dispatch(sidebarSwitch())}
    //         />
    //       </Divider>
    //     </div>
    //   );
    //   case "type3":
    //     return(
    //       <div className="chunk company-details">
    //         <h3>{chunk.value.title}</h3>
    //         <h4>{chunk.value.companyName}</h4>
    //         <h4>{chunk.value.duration}</h4>
    //         <p>{chunk.value.description}</p>
    //         <Input
    //           type="text"
    //           onChange={(event) => dispatch(updateChunk(id, event.target.value, TITLE))}
    //           placeholder="Job Title"
    //         />
    //         <Input
    //           type="text"
    //           onChange={(event) => dispatch(updateChunk(id, event.target.value, COMPANY))}
    //           placeholder="Company Name"
    //         />
    //         <Input
    //           type="text"
    //           onChange={(event) => dispatch(updateChunk(id, event.target.value, DURATION))}
    //           placeholder="Duration"
    //         />
    //         <TextArea
    //           row={4}
    //           type="text"
    //           onChange={(event) => dispatch(updateChunk(id, event.target.value, DESCRIPTION))}
    //           placeholder="Description"
    //         />
    //         <Divider className="chunk-btn-group">
    //           <Button
    //             icon={<PlusOutlined />}
    //             onClick={() => dispatch(insertChunk(id, "type1", "down"))}
    //           >New</Button>
    //           <Button
    //             icon={<DeleteOutlined />}
    //             onClick={() => dispatch(deleteChunk(id))}
    //           >Delete</Button>
    //           <Button
    //             icon={<ArrowUpOutlined />}
    //             onClick={() => dispatch(moveUpChunk(id))}
    //           />
    //           <Button
    //             icon={<ArrowDownOutlined />}
    //             onClick={() => dispatch(moveDownChunk(id))}
    //           />
    //           <Button
    //             icon={<BarsOutlined />}
    //             onClick={() => dispatch(sidebarSwitch())}
    //           />
    //         </Divider>
    //       </div>
    //     );

    default:
      return false;
  }
}
