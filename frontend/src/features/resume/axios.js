import {useSelector} from "react-redux"

// import {selectChunkIdList, selectChangeRecord} from "./resumeSlice"
import axios from "../../api"

// getChunk && getOrder
export async function getPreparation(user_id){
  const { data: { ChunkIdList } } = await axios.get("/getOrder", { params: { user_id: user_id } });
  const { data: { ChunkList } } = await axios.get("/getChunk", { params: { user_id: user_id } });
  // console.log("getPreparation___ChunkIdList: ", ChunkIdList);
  // console.log("getPreparation___ChunkList: ", ChunkList);
  let ChunkList_sorted = [];
  let isInitial = (ChunkIdList.length === 0) & (ChunkList.length === 0);
  if(isInitial) {
    let sampleInit = {
      id: (new Date()).getTime(), 
      type: "type1", 
      value: { text: "text" }
    }
    ChunkList_sorted.push(sampleInit);
  } 
  else {
    for(var i = 0; i < ChunkIdList.length; i++) {
      let chunk = ChunkList.find(chunk => chunk.id === ChunkIdList[i])
      ChunkList_sorted.push(chunk);
    }
  }

  // console.log("getPreparation___ChunkList_sorted: ", ChunkList_sorted);
  
  return ChunkList_sorted
}

export async function saveChunk(user_id, ChunkIdList, changeRecord){
  // console.log("saveChunk___user_id: ", user_id);
  // console.log("saveChunk___ChunkIdList: ", ChunkIdList);
  // console.log("saveChunk___changeRecord: ", changeRecord); 
  let response;
  response = await axios.post("/saveOrder", {user_id, ChunkIdList})
  console.log(response.data.message);

  for(var i = 0; i < changeRecord["update"].length; i++){
    response = await axios.post("/updateChunk", {user_id, UpdateChunk: changeRecord["update"][i]})
    console.log(response.data.message);
  }

  response = await axios.post("/deleteChunks", {DeleteChunkIdList: changeRecord["delete"]})
  console.log(response.data.message);
}


export async function login(account, password){
  await axios.post("/login", {account, password})
  .then((res)=>{console.log("res", res)})
  .catch((err) => console.log("err", err))
}

export async function register(userName, account, password){
  await axios.post("/register", {userName, account, password})
  .then((res)=>{console.log("res", res)})
  .catch((err) => console.log("err", err))
}