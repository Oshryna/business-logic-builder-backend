// Simulated user data for example
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

// Get all users
exports.getUsers = (req, res) => {
  req.logger.info("Fetching all users");
  res.json(users);
};

// Get user by ID
exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  req.logger.debug("Fetching user by ID", { userId: id });

  const user = users.find((u) => u.id === id);

  if (!user) {
    req.logger.warn("User not found", { userId: id });
    return res.status(404).json({ message: "User not found" });
  }

  req.logger.info("User found", { userId: id });
  res.json(user);
};

// Create a new user
exports.createUser = (req, res) => {
  const { name, email } = req.body;

  // Input validation
  if (!name || !email) {
    req.logger.warn("Invalid user data provided", {
      invalidFields: !name ? "name" : "email",
      providedData: req.body
    });
    return res.status(400).json({ message: "Name and email are required" });
  }

  // Create new user
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = { id: newId, name, email };

  users.push(newUser);

  req.logger.info("User created successfully", {
    userId: newId,
    userName: name
  });
  res.status(201).json(newUser);
};

// Update an existing user
exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  req.logger.debug("Updating user", { userId: id, updateData: req.body });

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    req.logger.warn("Failed to update - user not found", { userId: id });
    return res.status(404).json({ message: "User not found" });
  }

  // Update user data
  const updatedUser = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email
  };

  users[userIndex] = updatedUser;

  req.logger.info("User updated successfully", { userId: id });
  res.json(updatedUser);
};

// Delete a user
exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  req.logger.debug("Deleting user", { userId: id });

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    req.logger.warn("Failed to delete - user not found", { userId: id });
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);

  req.logger.info("User deleted successfully", { userId: id });
  res.status(204).send();
};
