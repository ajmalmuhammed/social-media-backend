import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    userId: {
      type: String,
    //   required: true,
    },
    title: {
      type: String,
      max: 100,
    },
    content: {
      type: String,
      max: 400
    },
    likes: {
      type: Array,
      default: [],
    },
  }
);

export default mongoose.model("Post", PostSchema);