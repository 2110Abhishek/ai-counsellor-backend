const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Shared CORS Options
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://ai-counsellor-frontend-delta.vercel.app",
    /\.vercel\.app$/, // Allow all Vercel subdomains (regex)
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Request Logger (Debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Origin:", req.headers.origin);
  next();
});

// ✅ CORS FIRST
app.use(cors(corsOptions));

// ✅ Explicit preflight handling
app.options("*", cors(corsOptions));

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
