exports.detectIntent = (message = "") => {
  const m = message.toLowerCase();

  if (m.includes("best") || m.includes("universit")) return "UNIVERSITY_QUERY";
  if (m.includes("budget") || m.includes("cost")) return "BUDGET_QUERY";
  if (m.includes("exam") || m.includes("ielts") || m.includes("gre"))
    return "EXAM_QUERY";
  if (m.includes("lock")) return "LOCK_QUERY";
  if (m.includes("next") || m.includes("what should"))
    return "NEXT_STEP_QUERY";

  return "GENERAL_QUERY";
};
