const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

async function getUsers() {
  return users;
}

async function getUserById(id) {
  return users.find((u) => u.id === id) || null;
}

async function createUser({ name, email }) {
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = { id: newId, name, email };
  users.push(newUser);
  return newUser;
}

async function updateUser(id, { name, email }) {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) return null;
  const updatedUser = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email
  };
  users[userIndex] = updatedUser;
  return updatedUser;
}

async function deleteUser(id) {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) return false;
  users.splice(userIndex, 1);
  return true;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
