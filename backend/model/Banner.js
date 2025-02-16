import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  addedOn: { type: Date, default: Date.now },
});

const Banner = mongoose.model("Banners", BannerSchema);

export default Banner;
