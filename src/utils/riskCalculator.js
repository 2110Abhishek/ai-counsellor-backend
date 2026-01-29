exports.calculateRisk = (profile, university) => {
  if (university.competitiveness === "HIGH" && profile.exams === "NOT_STARTED")
    return "HIGH";

  if (university.competitiveness === "MEDIUM")
    return "MEDIUM";

  return "LOW";
};

exports.acceptanceChance = (risk) => {
  if (risk === "LOW") return "HIGH";
  if (risk === "MEDIUM") return "MEDIUM";
  return "LOW";
};
