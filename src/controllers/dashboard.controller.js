const { PrismaClient } = require("@prisma/client");
const { STAGES } = require("../utils/constants");

const prisma = new PrismaClient();

exports.getDashboard = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    include: {
      profile: true,
      tasks: true
    }
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // 1️⃣ Stage label
  const stageMap = {
    [STAGES.NOT_ONBOARDED]: "Building Profile",
    [STAGES.PROFILE_READY]: "Profile Ready",
    [STAGES.DISCOVERING_UNIVERSITIES]: "Discovering Universities",
    [STAGES.UNIVERSITY_LOCKED]: "University Finalized",
    [STAGES.APPLICATION_PREP]: "Preparing Applications"
  };

  // 2️⃣ Profile strength (simple & explainable)
  let profileStrength = {
    academics: "Average",
    exams: "Not Started",
    sop: user.profile?.sopStatus || "Not Started"
  };

  if (user.profile?.ieltsStatus === "Completed") {
    profileStrength.exams = "Completed";
  }

  // 3️⃣ Next action hint
  let nextAction = "Complete onboarding";

  if (user.stage === STAGES.PROFILE_READY) {
    nextAction = "Explore universities with AI counsellor";
  }

  if (user.stage === STAGES.DISCOVERING_UNIVERSITIES) {
    nextAction = "Shortlist and lock a university";
  }

  if (user.stage === STAGES.UNIVERSITY_LOCKED) {
    nextAction = "Prepare application documents";
  }

  res.json({
    stage: user.stage,
    stageLabel: stageMap[user.stage],
    profileSummary: user.profile,
    profileStrength,
    tasks: user.tasks,
    nextAction
  });
};
