module.exports = (requiredStage) => {
  return (req, res, next) => {
    if (req.user.stage < requiredStage) {
      return res.status(403).json({ error: "Stage locked" });
    }
    next();
  };
};
