const Joi = require("joi");
const userService = require("../services/userService");

// Simulated user data for example
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

// Validation schema
const userSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required()
});

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    req.logger.info("Fetching all users");
    res.json(users);
  } catch (error) {
    req.logger.error("Error fetching users", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    req.logger.debug("Fetching user by ID", { userId: id });
    const user = await userService.getUserById(id);
    if (!user) {
      req.logger.warn("User not found", { userId: id });
      return res.status(404).json({ message: "User not found" });
    }
    req.logger.info("User found", { userId: id });
    res.json(user);
  } catch (error) {
    req.logger.error("Error fetching user by ID", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      req.logger.warn("Invalid user data provided", { error: error.details });
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email } = req.body;
    const newUser = await userService.createUser({ name, email });
    req.logger.info("User created successfully", {
      userId: newUser.id,
      userName: name
    });
    res.status(201).json(newUser);
  } catch (error) {
    req.logger.error("Error creating user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { error } = userSchema.validate(req.body);
    if (error) {
      req.logger.warn("Invalid user data for update", { error: error.details });
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email } = req.body;
    const updatedUser = await userService.updateUser(id, { name, email });
    if (!updatedUser) {
      req.logger.warn("Failed to update - user not found", { userId: id });
      return res.status(404).json({ message: "User not found" });
    }
    req.logger.info("User updated successfully", { userId: id });
    res.json(updatedUser);
  } catch (error) {
    req.logger.error("Error updating user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      req.logger.warn("Failed to delete - user not found", { userId: id });
      return res.status(404).json({ message: "User not found" });
    }
    req.logger.info("User deleted successfully", { userId: id });
    res.status(204).send();
  } catch (error) {
    req.logger.error("Error deleting user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
