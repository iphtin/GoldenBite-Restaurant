import Banner from "../model/Banner.js";

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({});
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addBanner = async (req, res) => {
  const { title, description, image } = req.body;
  try {
    const banner = new Banner({
      title,
      description,
      image,
    });
    await banner.save();
    res.status(201).json({ message: "Banner is created successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedBanner = await Banner.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res
      .status(200)
      .json({ message: "Banner updated successfully", banner: updatedBanner });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating banner", error: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const deleteBanner = await Banner.findByIdAndDelete(req.params.id);
    if (!deleteBanner)
      return res.status(404).json({ message: "Banner not found!" });
    res.status(200).json({ message: "Banner is deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
