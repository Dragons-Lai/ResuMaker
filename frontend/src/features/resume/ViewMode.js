import {useSelector} from "react-redux"
import {selectChunkIdList, selectChangeRecord} from "./resumeSlice"
import Chunk from "./Chunk"
import { saveChunk } from "./axios"

export default function ViewMode(){
  const chunkIdList = useSelector(selectChunkIdList)
  const changeRecord = useSelector(selectChangeRecord)
  let user_id = "Yun's UserId" // index.js跟ViewMode.js的user_id要一起改
  return (
    <container>
      {
        chunkIdList.map(chunkId => <Chunk key={chunkId} id={chunkId}/>)
      }
      <button onClick={() => saveChunk(user_id, chunkIdList, changeRecord)}>save</button>
    </container>)
  
}