const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

/* 1️⃣ CORS FIRST — before helmet */
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

/* 2️⃣ Helmet AFTER CORS */
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



/* 3️⃣ Body parser */
app.use(express.json());

/* 4️⃣ Routes */
app.use("/auth", require("./routes/auth.routes"));
app.use("/onboarding", require("./routes/onboarding.routes"));
app.use("/counsellor", require("./routes/counsellor.routes"));
app.use("/universities", require("./routes/university.routes"));
app.use("/tasks", require("./routes/task.routes"));
app.use("/dashboard", require("./routes/dashboard.routes"));
app.use("/profile", require("./routes/profile.routes"));

app.get("/", (_, res) => res.json({ status: "OK" }));

module.exports = app;
