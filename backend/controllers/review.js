import Review from "../model/Review.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "name email") // Populating user details
      .populate("foodId", "name price"); // Populating food details

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFoodReviews = async (req, res) => {
  const { foodId } = req.params; // Extract foodId from request parameters

  try {
    // Validate if foodId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).json({ message: "Invalid foodId" });
    }

    // Find reviews for the given foodId and populate user details
    const reviews = await Review.find({ foodId })
      .populate("userId", "name email") // Populate user details
      .populate("foodId", "name"); // Optionally populate food details

    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this food" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  const { userId, foodId, rating, comment } = req.body;
  try {
    const review = new Review({ userId, foodId, rating, comment });
    await review.save();
    res.status(201).json({ message: "Review is created successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndDelete(id);
    if (!review) return res.status(404).json({ message: "Review not found!" });
    res.status(200).json({ message: "Review is deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
