const { PrismaClient } = require("@prisma/client");
const { askCounsellorAI } = require("../services/ai.service");
const { executeAIAction } = require("../services/aiExecutor.service");

const prisma = new PrismaClient();

exports.chat = async (req, res) => {
  const { message } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    include: { profile: true }
  });

  if (!user.profile) {
    return res.json({
      reply: "Please complete onboarding first.",
      action: null
    });
  }

  // 1️⃣ Ask AI
  const aiResponse = await askCounsellorAI({ user, message });

  // 2️⃣ Execute action if present
  let executionResult = null;
  if (aiResponse.action) {
    executionResult = await executeAIAction({
      userId: user.id,
      action: aiResponse.action,
      payload: aiResponse.payload
    });
  }

  // 3️⃣ Return combined response
  res.json({
    reply: aiResponse.reply,
    actionTaken: aiResponse.action,
    result: executionResult
  });
};
