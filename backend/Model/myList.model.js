import mongoose from "mongoose";

const myListSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const MyListModel = mongoose.model("MyList", myListSchema);

export default MyListModel;
