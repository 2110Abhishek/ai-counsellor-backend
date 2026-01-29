const { PrismaClient } = require("@prisma/client");
const { STAGES } = require("../utils/constants");

const prisma = new PrismaClient();

exports.updateProfile = async (req, res) => {
  const userId = req.userId;
  const updatedData = req.body;

  // 1️⃣ Update profile
  const profile = await prisma.profile.update({
    where: { userId },
    data: updatedData
  });

  // 2️⃣ If profile changes after university lock → warning logic
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user.stage >= STAGES.UNIVERSITY_LOCKED) {
    // Soft reset (discipline)
    await prisma.user.update({
      where: { id: userId },
      data: { stage: STAGES.DISCOVERING_UNIVERSITIES }
    });

    await prisma.task.deleteMany({
      where: {
        userId,
        stage: STAGES.APPLICATION_PREP
      }
    });
  }

  // 3️⃣ Ensure discovery tasks exist
  const existing = await prisma.task.findFirst({
    where: {
      userId,
      title: "Explore universities with AI counsellor"
    }
  });

  if (!existing) {
    await prisma.task.create({
      data: {
        userId,
        title: "Explore universities with AI counsellor",
        status: "PENDING",
        stage: STAGES.DISCOVERING_UNIVERSITIES
      }
    });
  }

  res.json({
    message: "Profile updated and recommendations recalculated",
    profile
  });
};
