import { useSelector } from "react-redux";

import { selectChunkById } from "./resumeSlice";
// import { TITLE, DURATION, COMPANY, DESCRIPTION } from "./constants";
import { InfoChunk_1, BpChunk_1, BpChunk_2, MtChunk_1, McChunk_1, LineChunk_1 } from "../chunk";
import ChunkWrapper from "../chunk/global/ChunkWrapper";

// declare Chunk ===========================
export default function Chunk({ id, mode }) {
  const chunk = useSelector(selectChunkById(id));

  var chunk_content = false;
  switch (chunk.type) {
    case "infoChunk_1":
      chunk_content = <InfoChunk_1 chunk={chunk} id={id} mode={mode}></InfoChunk_1>;
      break;
    case "bpChunk_1":
      chunk_content = <BpChunk_1 chunk={chunk} id={id} mode={mode}></BpChunk_1>;
      break;
    case "bpChunk_2":
      chunk_content = <BpChunk_2 chunk={chunk} id={id} mode={mode}></BpChunk_2>;
      break;
    case "mtChunk_1":
      chunk_content = <MtChunk_1 chunk={chunk} id={id} mode={mode}></MtChunk_1>;
      break;
    case "mcChunk_1":
      chunk_content = <McChunk_1 chunk={chunk} id={id} mode={mode}></McChunk_1>;
      break;
    case "lineChunk_1":
      chunk_content = <LineChunk_1 chunk={chunk} id={id} mode={mode}></LineChunk_1>;
    default:
      break;
  }

  return (
    <ChunkWrapper chunkId={id} mode={mode}>
      {chunk_content}
    </ChunkWrapper>
  );
}
