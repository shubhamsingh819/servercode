require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const dbURI = process.env.MONGODB_URI; // Using environment variable for MongoDB URI

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Close MongoDB connection when Node.js process terminates
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});
