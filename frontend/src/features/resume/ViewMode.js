import { useSelector } from "react-redux";

import { selectChunkIdList } from "./resumeSlice";
import Chunk from "./Chunk";
import Sidebar from "./sidebar";

export default function ViewMode() {
  const chunkIdList = useSelector(selectChunkIdList);

  return (
    <>
      <container>
        {chunkIdList.map((chunkId) => (
          <Chunk key={chunkId} id={chunkId} />
        ))}
      </container>
      <Sidebar />
    </>
  );
}
