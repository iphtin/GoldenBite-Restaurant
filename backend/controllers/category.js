import Category from "../model/Category.js";
import Food from "../model/Food.js";

// Add new category

export const addCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    const newCategory = new Category({ name, image });
    await newCategory.save();

    res.status(201).json({ message: "Category is created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const foods = await Food.find({ category: req.params.id });
    await Food.deleteMany({ category: req.params.id });

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category and associated food items deleted successfully",
      foods: foods,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        image,
      },
      { new: true }
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category is updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
