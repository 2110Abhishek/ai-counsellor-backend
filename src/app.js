const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS FIRST
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-counsellor-frontend-delta.vercel.app",
    "https://*.vercel.app"
  ],
  credentials: true,
}));

// ✅ Explicit preflight handling
app.options("*", cors());

// ✅ THEN body parser
app.use(express.json());

// ✅ THEN routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/onboarding", require("./routes/onboarding.routes"));
app.use("/counsellor", require("./routes/counsellor.routes"));
app.use("/universities", require("./routes/university.routes"));
app.use("/tasks", require("./routes/task.routes"));
app.use("/dashboard", require("./routes/dashboard.routes"));
app.use("/profile", require("./routes/profile.routes"));

app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;
