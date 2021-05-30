import {useSelector, useDispatch} from "react-redux"
import {insertChunk, deleteChunk, updateChunk} from "./resumeSlice"
import {selectChunkById} from "./resumeSlice"


export default function Chunk({id}){
  const chunk = useSelector(selectChunkById(id))
  const dispatch = useDispatch()

  switch(chunk.type){
    case("type1"):
      return (
        <div>
          <p>{chunk.value.text}</p>
          <button onClick={() => dispatch(insertChunk(id, "type1", "up"))}>+</button>
          <button onClick={() => dispatch(deleteChunk(id))}>-</button>
          <input type="text" onChange={(event) => dispatch(updateChunk(id, event.target.value))}/>
        </div>)

    default:
      return false
  }
}