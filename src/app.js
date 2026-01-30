const express = require("express");
const cors = require("cors");
// const helmet = require("helmet");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-counsellor-frontend-zrca-3ybtgelk4-2110abhisheks-projects.vercel.app",
    "https://ai-counsellor-frontend-delta.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());


app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* 2️⃣ Helmet AFTER CORS */
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       useDefaults: true,
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
//         styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
//         fontSrc: ["'self'", "https://fonts.gstatic.com"],
//         imgSrc: ["'self'", "data:", "https:"],
//         connectSrc: [
//           "'self'",
//           "https://ai-counsellor-backend-ucjh.onrender.com",
//           "https://*.vercel.app",
//         ],
//       },
//     },
//   })
// );



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
