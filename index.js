const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://fitnessfrontend-omega.vercel.app",
    "https://fitnessfrontend-m7kz4hf9h-marcg1922s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const weightRoutes = require("./routes/weightRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/trainings", trainingRoutes);
app.use("/api/weights", weightRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});