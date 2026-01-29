const prisma = require("../prisma/client");
const { STAGES } = require("../utils/constants");
const { syncTasksForStage } = require("../services/task.logic");

exports.completeOnboarding = async (req, res) => {
  try {
    const userId = req.userId;
    const data = req.body;

    // 1️⃣ UPSERT PROFILE
    await prisma.profile.upsert({
      where: { userId },
      update: { ...data },
      create: {
        ...data,
        userId
      }
    });

    // 2️⃣ MOVE USER TO PROFILE_READY
    await prisma.user.update({
      where: { id: userId },
      data: { stage: STAGES.PROFILE_READY }
    });

    // 3️⃣ AUTO-GENERATE TASKS FOR STAGE
    await syncTasksForStage(userId, STAGES.PROFILE_READY);

    res.json({ message: "Onboarding completed successfully" });
  } catch (err) {
    console.error("ONBOARDING ERROR:", err);
    res.status(500).json({ error: "Failed to complete onboarding" });
  }
};
