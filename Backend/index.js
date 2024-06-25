const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const mongodbUrl = process.env.MONGODB_URL;
mongoose.connect(mongodbUrl);

mongoose.connection.on("connected", () => {
	console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
	console.error("MongoDB connection error:", err);
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/cart", require("./routes/cart"));

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
