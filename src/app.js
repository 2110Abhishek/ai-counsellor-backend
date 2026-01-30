const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const onboardingRoutes = require("./routes/onboarding.routes");
const counsellorRoutes = require("./routes/counsellor.routes");
const universityRoutes = require("./routes/university.routes");
const taskRoutes = require("./routes/task.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const profileRoutes = require("./routes/profile.routes");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: [
          "'self'",
          "https://ai-counsellor-backend-ucjh.onrender.com",
          "https://*.vercel.app",
        ],
      },
    },
  })
);

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      origin.includes("vercel.app") ||
      origin === "http://localhost:5173"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};



app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/onboarding", onboardingRoutes);
app.use("/counsellor", counsellorRoutes);
app.use("/universities", universityRoutes);
app.use("/tasks", taskRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/profile", profileRoutes);

module.exports = app;
