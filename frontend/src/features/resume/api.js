import axios from "../../axios";

// getChunk && getOrder
export async function getPreparation() {
  const {
    data: { ChunkIdList },
  } = await axios.get("/getOrder");
  const {
    data: { ChunkList },
  } = await axios.get("/getChunk");

  // console.log("getPreparation___ChunkIdList: ", ChunkIdList);
  // console.log("getPreparation___ChunkList: ", ChunkList);
  let ChunkList_sorted = [];
  let isInitial = (ChunkIdList.length === 0) & (ChunkList.length === 0);
  if (!isInitial) {
    for (var i = 0; i < ChunkIdList.length; i++) {
      let chunk = ChunkList.find((chunk) => chunk.id === ChunkIdList[i]);
      ChunkList_sorted.push(chunk);
    }
  }

  // console.log("getPreparation___ChunkList_sorted: ", ChunkList_sorted);

  return ChunkList_sorted;
}

export async function saveChunk(ChunkIdList, changeRecord) {
  // console.log("saveChunk___user_id: ", user_id);
  // console.log("saveChunk___ChunkIdList: ", ChunkIdList);
  // console.log("saveChunk___changeRecord: ", changeRecord);
  let response;
  response = await axios.post("/saveOrder", { ChunkIdList });
  console.log(response.data.message);

  for (var i = 0; i < changeRecord["update"].length; i++) {
    response = await axios.post("/updateChunk", {
      UpdateChunk: changeRecord["update"][i],
    });
    console.log(response.data.message);
  }

  // 順序很重要，一定要先 Update 再 delete
  response = await axios.post("/deleteChunks", {
    DeleteChunkIdList: changeRecord["delete"],
  });
  console.log(response.data.message);
}
