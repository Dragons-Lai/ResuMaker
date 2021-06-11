import { Router } from "express";
import Chunk from "../models/Chunk.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

const router = Router();

router.get("/getOrder", async function (req, res) {
  try {
    const { user_id } = req.query;
    console.log("getOrder___user_id: ", user_id);
    let query = await Order.findOne({ user_id: user_id });
    if (query !== null) {
      let ChunkIdList = query.order.split("->");
      ChunkIdList = ChunkIdList.map((x) => parseInt(x, 10));
      res.send({ ChunkIdList: ChunkIdList });
    } else {
      res.send({ ChunkIdList: [] });
    }
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

router.get("/getChunk", async function (req, res) {
  try {
    const { user_id } = req.query;
    console.log("getChunk___user_id: ", user_id);
    let query = await Chunk.find({ user_id: user_id });
    if (query !== []) {
      res.send({ ChunkList: query });
    } else {
      res.send({ ChunkList: [] });
    }
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

router.post("/saveOrder", async function (req, res) {
  try {
    const { user_id, ChunkIdList } = req.body;
    // console.log("saveOrder___user_id: ", user_id);
    // console.log("saveOrder___ChunkIdList: ", ChunkIdList);
    let ChunkIdList2Text = ChunkIdList.join("->");
    let condition = { user_id: user_id };
    const query = await Order.findOne(condition);
    if (query === null) {
      const order = new Order({ user_id: user_id, order: ChunkIdList2Text });
      await order.save();
    } else {
      let update = { order: ChunkIdList2Text };
      await Order.findOneAndUpdate(condition, update);
    }
    res.json({ message: "saveOrder done" });
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

router.post("/deleteChunks", async function (req, res) {
  try {
    const { DeleteChunkIdList } = req.body;
    // console.log("deleteChunks___DeleteChunkIdList: ", DeleteChunkIdList);
    for (var i = 0; i < DeleteChunkIdList.length; i++) {
      let condition = { id: DeleteChunkIdList[i] };
      await Chunk.remove(condition);
    }
    res.json({ message: "deleteChunks done" });
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

router.post("/updateChunk", async function (req, res) {
  try {
    const { user_id, UpdateChunk } = req.body;
    // console.log("updateChunk___user_id: ", user_id);
    // console.log("updateChunk___UpdateChunk: ", UpdateChunk);

    let condition = { id: UpdateChunk.id };
    const query = await Chunk.findOne(condition);
    if (query === null) {
      const chunk = new Chunk({
        user_id: user_id,
        id: UpdateChunk.id,
        type: UpdateChunk.type,
        value: UpdateChunk.value,
      });
      await chunk.save();
    } else {
      let update = { value: UpdateChunk.value };
      // console.log("update: ", update);
      await Chunk.findOneAndUpdate(condition, update);
    }
    res.json({ message: "updateChunk done" });
  } catch (e) {
    console.log(e);
    res.json({ message: "Something went wrong..." });
  }
});

export default router;
