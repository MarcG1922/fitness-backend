const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://fitnessfrontend-omega.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const trainingRoutes = require('./routes/trainingRoutes');
app.use('/api/trainings', trainingRoutes);

const weightRoutes = require("./routes/weightRoutes");
app.use("/api/weights", weightRoutes);

const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});