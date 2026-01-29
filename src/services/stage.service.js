const { STAGES } = require("../utils/constants");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.updateStage = async (userId, newStage) => {
  return prisma.user.update({
    where: { id: userId },
    data: { stage: newStage }
  });
};

exports.ensureStage = (currentStage, requiredStage) => {
  if (currentStage < requiredStage) {
    throw new Error("Action not allowed at this stage");
  }
};
