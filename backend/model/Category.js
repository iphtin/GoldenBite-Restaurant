import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  addedOn: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
