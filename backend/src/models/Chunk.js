import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChunkSchema = new Schema({
  user_id: {
    type: String,
    required: [true, "user_id field is required."],
  },
  id: {
    type: Number,
    required: [true, "id field is required."],
  },
  type: {
    type: String,
    required: [true, "type field is required."],
  },
  value: {
    type: Object,
    required: [true, "text field is required."],
  },
});

const Chunk = mongoose.model("Chunk", ChunkSchema);

export default Chunk;
