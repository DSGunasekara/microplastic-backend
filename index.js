const express = require("express");
const cors = require("cors");

const connectDb = require("./DB/db");
const homeRoute = require("./routes/home");

const app = express();

connectDb();

app.use(cors());
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.status(200).send("API is running"));

app.use("/api", homeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
