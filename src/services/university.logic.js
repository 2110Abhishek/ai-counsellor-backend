const { calculateRisk, acceptanceChance } = require("../utils/riskCalculator");

exports.recommendUniversities = (profile, universities) => {
  return universities.map((uni) => {
    const risk = calculateRisk({
      userBudget: profile.budget,
      uniCost: uni.cost,
      uniRanking: uni.ranking
    });

    const acceptance = acceptanceChance({ uniRanking: uni.ranking });

    let category = "Target";
    if (risk === "HIGH") category = "Dream";
    if (risk === "LOW") category = "Safe";

    return {
      ...uni,
      risk,
      acceptance,
      category
    };
  });
};
