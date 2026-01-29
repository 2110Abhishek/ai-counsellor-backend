const { detectIntent } = require("../utils/intentDetector");

exports.askCounsellorAI = async ({ user, message }) => {
  const intent = detectIntent(message);
  const profile = user.profile || {};
  const stage = user.stage;

  // ---------- STAGE 1: DISCOVERY ----------
  if (stage === 1) {
    if (intent === "UNIVERSITY_QUERY") {
      const countries = profile.preferredCountries?.length
        ? profile.preferredCountries.join(", ")
        : "Germany, Canada";

      return {
        reply: `Based on your academic background and budget, universities in ${countries} are suitable. I recommend shortlisting 2–3 options so we can evaluate risk vs fit.`,
        action: "RECOMMEND_UNIVERSITIES",
        payload: { countries }
      };
    }

    if (intent === "BUDGET_QUERY") {
      return {
        reply:
          "Your budget suggests focusing on public universities and countries with lower tuition fees. Germany is a strong option due to minimal tuition costs.",
        action: null,
        payload: {}
      };
    }

    return {
      reply:
        "At this stage, our goal is to explore universities that match your profile. Ask me about universities, budget, or next steps.",
      action: null,
      payload: {}
    };
  }

  // ---------- STAGE 2: SHORTLIST ----------
  if (stage === 2) {
    if (intent === "LOCK_QUERY") {
      return {
        reply:
          "Locking a university helps you focus your application strategy. Once locked, I’ll generate a personalized application checklist.",
        action: "PROMPT_LOCK",
        payload: {}
      };
    }

    return {
      reply:
        "You have shortlisted universities. Review their risks and costs, then lock at least one to proceed.",
      action: null,
      payload: {}
    };
  }

  // ---------- STAGE 3: APPLICATION ----------
  if (stage === 3) {
    if (intent === "NEXT_STEP_QUERY") {
      return {
        reply:
          "Your next steps are SOP finalization, exam completion, and document collection. I’ve created tasks to guide you.",
        action: "GENERATE_TASKS",
        payload: {}
      };
    }

    return {
      reply:
        "You are now in application preparation. Ask me about SOPs, exams, or timelines.",
      action: null,
      payload: {}
    };
  }

  // ---------- FALLBACK ----------
  return {
    reply:
      "Tell me more about your goals so I can guide you better.",
    action: null,
    payload: {}
  };
};
