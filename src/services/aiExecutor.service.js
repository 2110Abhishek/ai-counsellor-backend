const { PrismaClient } = require("@prisma/client");
const { STAGES } = require("../utils/constants");
const universities = require("../data/universities");

const prisma = new PrismaClient();

exports.executeAIAction = async ({ userId, action, payload }) => {
  switch (action) {
    case "SHORTLIST_UNIVERSITY": {
      const uni = universities.find((u) => u.id === payload.universityId);
      if (!uni) throw new Error("University not found");

      // Prototype: store shortlist implicitly (no join table yet)
      return { success: true, message: `${uni.name} shortlisted` };
    }

    case "LOCK_UNIVERSITY": {
      const uni = universities.find((u) => u.id === payload.universityId);
      if (!uni) throw new Error("University not found");

      await prisma.user.update({
        where: { id: userId },
        data: { stage: STAGES.UNIVERSITY_LOCKED }
      });

      await prisma.task.createMany({
        data: [
          {
            userId,
            title: "Finalize SOP",
            status: "PENDING",
            stage: STAGES.APPLICATION_PREP
          },
          {
            userId,
            title: "Submit application",
            status: "PENDING",
            stage: STAGES.APPLICATION_PREP
          }
        ]
      });

      return {
        success: true,
        message: `University ${uni.name} locked`
      };
    }

    case "CREATE_TASK": {
      await prisma.task.create({
        data: {
          userId,
          title: payload.title,
          status: "PENDING",
          stage: payload.stage
        }
      });
      return { success: true, message: "Task created" };
    }

    default:
      return { success: false, message: "No action executed" };
  }
};
