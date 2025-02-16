import User from "../model/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, deliveryAddress } = req.body;
  const updatedUser = {};
  if (name) updatedUser.name = name;
  if (email) updatedUser.email = email;
  if (deliveryAddress) updatedUser.deliveryAddress = deliveryAddress;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, updatedUser, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Profile updated Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
