import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user_id: {
    type: String,
    required: [true, "user_id field is required."],
  },
  order: {
    type: Array,
    required: [true, "order field is required."],
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
