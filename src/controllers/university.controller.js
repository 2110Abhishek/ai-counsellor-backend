const prisma = require("../prisma/client");
const universities = require("../data/universities");
const { recommendUniversities } = require("../services/university.logic");
const { STAGES } = require("../utils/constants");
const { syncTasksForStage } = require("../services/task.logic");

exports.getRecommendations = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    include: { profile: true }
  });

  if (user.stage < STAGES.PROFILE_READY) {
    return res.status(403).json({ error: "Complete onboarding first" });
  }

  const recommended = recommendUniversities(user.profile, universities);

  // 🔥 AUTO MOVE TO DISCOVERY STAGE
  if (user.stage === STAGES.PROFILE_READY) {
    await prisma.user.update({
      where: { id: user.id },
      data: { stage: STAGES.DISCOVERING_UNIVERSITIES }
    });

    await syncTasksForStage(user.id, STAGES.DISCOVERING_UNIVERSITIES);
  }

  res.json(recommended);
};

exports.lockUniversity = async (req, res) => {
  const { universityId } = req.params;
  const userId = req.userId;

  const uni = universities.find(
    (u) => String(u.id) === String(universityId)
  );
  if (!uni) {
    return res.status(404).json({ error: "University not found" });
  }

  // 1️⃣ MOVE USER TO APPLICATION PREP
  await prisma.user.update({
    where: { id: userId },
    data: { stage: STAGES.APPLICATION_PREP }
  });

  // 2️⃣ AUTO-GENERATE APPLICATION TASKS
  await syncTasksForStage(userId, STAGES.APPLICATION_PREP);

  res.json({
    message: `University ${uni.name} locked successfully`,
    nextStage: "APPLICATION_PREP"
  });
};
