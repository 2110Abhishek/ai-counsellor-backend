const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.userId },
    orderBy: { stage: "asc" }
  });
  res.json(tasks);
};

exports.completeTask = async (req, res) => {
  const { taskId } = req.params;

  await prisma.task.update({
    where: { id: taskId },
    data: { status: "COMPLETED" }
  });

  res.json({ message: "Task marked as completed" });
};
