import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "antd";

import { updateChunk } from "./resumeSlice";
import { selectChunkById } from "./resumeSlice";
// import { TITLE, DURATION, COMPANY, DESCRIPTION } from "./constants";
import InfoChunk_1 from "../chunk/InfoChunk_1/InfoChunk_1";
import BpChunk_1 from "../chunk/BpChunk_1/BpChunk_1";
import MtChunk_1 from "../chunk/MtChunk_1/MtChunk_1";
import ChunkWrapper from "../chunk/global/ChunkWrapper";

const { TextArea } = Input;

// declare Chunk ===========================
export default function Chunk({ id }) {
  const [isEditingChunk, setIsEditingChunk] = useState(true);

  const chunk = useSelector(selectChunkById(id));
  const dispatch = useDispatch();

  var chunk_content = false;
  switch (chunk.type) {
    case "infoChunk_1":
      chunk_content = <InfoChunk_1 chunk={chunk} id={id}></InfoChunk_1>;
      break;
    // case "type1":
    //   chunk_content = (
    //     <div className="chunk chunk-type1">
    //       {isEditingChunk ? (
    //         <p onClick={() => setIsEditingChunk(!isEditingChunk)}>{chunk.value.text}</p>
    //       ) : (
    //         <Input
    //           type="text"
    //           onChange={(event) => dispatch(updateChunk(id, event.target.value))}
    //           onBlur={() => setIsEditingChunk(!isEditingChunk)}
    //           value={chunk.value.text}
    //           // allowClear
    //           bordered={false}
    //         />
    //       )}
    //     </div>
    //   );
    //   break;
    case "bpChunk_1":
      chunk_content = <BpChunk_1 chunk={chunk} id={id}></BpChunk_1>;
      break;
    case "mtChunk_1":
      chunk_content = <MtChunk_1 chunk={chunk} id={id}></MtChunk_1>;
      break;
    default:
      break;
  }

  return <ChunkWrapper chunkId={id}>{chunk_content}</ChunkWrapper>;
}
