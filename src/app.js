const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const onboardingRoutes = require("./routes/onboarding.routes");
const counsellorRoutes = require("./routes/counsellor.routes");
const universityRoutes = require("./routes/university.routes");
const taskRoutes = require("./routes/task.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const profileRoutes = require("./routes/profile.routes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-counsellor-frontend-delta.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/onboarding", onboardingRoutes);
app.use("/counsellor", counsellorRoutes);
app.use("/universities", universityRoutes);
app.use("/tasks", taskRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/profile", profileRoutes);
app.options("*", cors());

module.exports = app;
