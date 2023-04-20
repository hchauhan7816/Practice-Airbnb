require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const baseRoutes = require("./routes/baseRoutes");
const userAuthMiddleware = require("./middleware/userAuthMiddleware");

// express app
const app = express();

app.use(express.json());

// middleware
app.use((req, res, next) => {
  console.log("Request ===> ", req.method, req.path);
  console.log("Body    ===> ", req.body, "\n\n");
  next();
});

const corsOptions = {
  origin: "http://127.0.0.1:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// app.use(cors());

// app.options("*", cors(corsOptions));

// Routes
// basic functionality routes
app.use("/api/base", userAuthMiddleware, baseRoutes);

// user routes
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Error -> ", error);
  });
