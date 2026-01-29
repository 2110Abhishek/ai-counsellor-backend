  const prisma = require("../prisma/client");
  const { STAGES } = require("../utils/constants");

  const TASK_TEMPLATES = {
    [STAGES.PROFILE_READY]: [
      "Explore universities with AI counsellor",
      "Review Dream / Target / Safe universities"
    ],
    [STAGES.DISCOVERING_UNIVERSITIES]: [
      "Shortlist at least 3 universities",
      "Compare cost and risk factors",
      "Lock at least one university"
    ],
    [STAGES.APPLICATION_PREP]: [
      "Finalize SOP",
      "Prepare IELTS / TOEFL",
      "Collect academic documents",
      "Submit application"
    ]
  };

  exports.syncTasksForStage = async (userId, stage) => {
    const titles = TASK_TEMPLATES[stage] || [];

    // 1️⃣ Remove existing tasks for this stage
    await prisma.task.deleteMany({
      where: { userId, stage }
    });

    // 2️⃣ Create fresh tasks
    if (titles.length > 0) {
      await prisma.task.createMany({
        data: titles.map((title) => ({
          userId,
          title,
          stage,
          status: "PENDING"
        }))
      });
    }
  };
