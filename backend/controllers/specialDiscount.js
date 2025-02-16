import SpecialDiscount from "../model/SpecialDiscount.js";

// Create a new special discount
export const createSpecialDiscount = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      averageRating,
      extras,
      expiryDate,
    } = req.body;

    // Create a new discount
    const newDiscount = new SpecialDiscount({
      name,
      description,
      price,
      image,
      averageRating,
      extras,
      expiryDate,
    });

    // Save to the database
    const savedDiscount = await newDiscount.save();
    res.status(201).json({
      success: true,
      message: "Special discount created successfully",
      data: savedDiscount,
    });
  } catch (error) {
    console.error("Error creating special discount", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all special discounts
export const getSpecialDiscounts = async (req, res) => {
  try {
    const discounts = await SpecialDiscount.find();
    res.status(200).json(discounts);
  } catch (error) {
    console.error("Error fetching special discounts", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a special discount
export const updateSpecialDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedDiscount = await SpecialDiscount.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedDiscount) {
      return res.status(404).json({
        success: false,
        message: "Special discount not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Special discount updated successfully",
      data: updatedDiscount,
    });
  } catch (error) {
    console.error("Error updating special discount", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a special discount
export const deleteSpecialDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDiscount = await SpecialDiscount.findByIdAndDelete(id);

    if (!deletedDiscount) {
      return res.status(404).json({
        success: false,
        message: "Special discount not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Special discount deleted successfully",
      data: deletedDiscount,
    });
  } catch (error) {
    console.error("Error deleting special discount", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
