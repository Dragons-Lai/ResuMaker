import axios from "../../axios";

// getChunk && getOrder
export async function getPreparation(viewee) {
  const {
    data: { ChunkIdList },
  } = await axios.get("/getOrder", { params: { viewee } });
  const {
    data: { ChunkList },
  } = await axios.get("/getChunk", { params: { viewee } });

  let ChunkList_sorted = [];
  let isInitial = (ChunkIdList.length === 0) & (ChunkList.length === 0);
  if (!isInitial) {
    for (var i = 0; i < ChunkIdList.length; i++) {
      let chunk = ChunkList.find((chunk) => chunk.id === ChunkIdList[i]);
      ChunkList_sorted.push(chunk);
    }
  }
  return ChunkList_sorted;
}

export async function saveChunk(ChunkIdList, changeRecord) {
  let response;
  response = await axios.post("/saveOrder", { ChunkIdList });
  console.log(response.data.message);

  for (var i = 0; i < changeRecord["update"].length; i++) {
    response = await axios.post("/updateChunk", {
      UpdateChunk: changeRecord["update"][i],
    });
    console.log(response.data.message);
  }

  response = await axios.post("/deleteChunks", {
    DeleteChunkIdList: changeRecord["delete"],
  });
  console.log(response.data.message);
}

export async function getUserName() {
  const response = await axios.get("/getUserName");
  const userName = response.data;
  return userName;
}

export async function setSharable(sharable) {
  const response = await axios.post("/setSharable", { sharable });
  return response.data
}

export async function getSharable() {
  // return the sharable value after setting.
  const response = await axios.get("/getSharable");
  const sharble = response.data;
  return sharble;
}
