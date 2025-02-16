import Food from "../model/Food.js";

export const addFood = async (req, res) => {
  const {
    name,
    description,
    price,
    availabilitySchedule,
    image,
    extras,
    category,
  } = req.body;
  console.log("AddFood Here");
  console.log(req.body);
  try {
    const food = new Food({
      name,
      description,
      price,
      availabilitySchedule,
      image,
      extras,
      category,
    });
    await food.save();
    res.status(201).json({ message: "Food is created successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!food) return res.status(404).send("No food found with that id");
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate("category", "name");
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatedFood = async (req, res) => {
  const food = req.body;

  try {
    // Update the food item in the database
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, food, {
      new: true,
    });

    if (!updatedFood) return res.status(404).send("No food found with that id");

    res.json({ message: "Food is updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Food deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
