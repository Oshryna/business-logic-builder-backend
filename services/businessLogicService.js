const BusinessLogic = require("../models/BusinessLogic");

async function createBusinessLogic(logic, rejectId) {
  console.log(logic, rejectId);
  return await BusinessLogic.create({
    Logic: JSON.stringify(logic),
    RejectId: rejectId
  });
}

async function getBusinessLogics() {
  return await BusinessLogic.findAll();
}

async function getBusinessLogicById(id) {
  return await BusinessLogic.findByPk(id);
}

// async function updateBusinessLogic(id, newData) {
//   const user = await getBusinessLogicById(id);
//   if (!user) throw new Error("Business logic not found");
//   return await user.update(newData);
// }

// async function deleteBusinessLogic(id) {
//   const user = await getBusinessLogicById(id);
//   if (!user) throw new Error("Business logic not found");
//   await user.destroy();
//   return { message: "Business logic deleted successfully" };
// }

// module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
module.exports = {
  createBusinessLogic,
  getBusinessLogics,
  getBusinessLogicById
};
