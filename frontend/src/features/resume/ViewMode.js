import {useSelector} from "react-redux"
import {selectChunkIdList, selectChangeRecord} from "./resumeSlice"
import Chunk from "./Chunk"
import {saveChunk, register, login} from "./axios"

export default function ViewMode(){
  const chunkIdList = useSelector(selectChunkIdList)
  const changeRecord = useSelector(selectChangeRecord)
  let user_id = "Yun's UserId" // index.js 跟 ViewMode.js 的 user_id 要一起改
  
  return (
    <container>
      {
        chunkIdList.map(chunkId => <Chunk key={chunkId} id={chunkId}/>)
      }
      <button onClick={() => saveChunk(user_id, chunkIdList, changeRecord)}>save</button>
      <button onClick={() => {login("Yun", "test")}}>login</button>
      <button onClick={() => {register("Fish", "Yun", "test")}}>register</button>
    </container>)
  
}