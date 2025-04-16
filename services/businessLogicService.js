const Joi = require("joi");
const BusinessLogic = require("../models/BusinessLogic");

const businessLogicSchema = Joi.object({
  Logic: Joi.any().required(),
  RejectId: Joi.string().required()
});

async function createBusinessLogic(logic, rejectId) {
  const { error } = businessLogicSchema.validate({
    Logic: logic,
    RejectId: rejectId
  });
  if (error) {
    throw new Error(error.details[0].message);
  }
  try {
    return await BusinessLogic.create({
      Logic: JSON.stringify(logic),
      RejectId: rejectId
    });
  } catch (err) {
    throw new Error("Failed to create business logic: " + err.message);
  }
}

async function getBusinessLogics() {
  try {
    return await BusinessLogic.findAll();
  } catch (err) {
    throw new Error("Failed to fetch business logics: " + err.message);
  }
}

async function getBusinessLogicById(id) {
  try {
    return await BusinessLogic.findByPk(id);
  } catch (err) {
    throw new Error("Failed to fetch business logic by id: " + err.message);
  }
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
