import {useSelector} from "react-redux"

import {selectChunkIdList, selectChangeRecord} from "./resumeSlice"
import axios from "../../api"

// getChunk && getOrder
export async function getPreparation(){
  axios.get("/getOrder")
  axios.get("/getChunk")

    // 首先要根據 order 排序 chunk
}

export async function saveChunk(chunkOrderList, changeRecord){
  
  axios.post("/saveOrder", chunkOrderList)
  axios.post("/deleteChunks", changeRecord["delete"])
  for(var i = 0; i < changeRecord["update"].length; i++)
    axios.post("/updateChunk", changeRecord["update"][i])
}