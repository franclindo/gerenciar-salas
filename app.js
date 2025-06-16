const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const labRoutes = require("./routes/labRoutes");
const authRoutes = require("./routes/authRoutes");
const videoTutorialRoutes = require("./routes/videoTutorialRoutes");
const temperaturaRoutes = require("./routes/temperaturaRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.error("Erro ao conectar no Mongo:", err));

app.use("/laboratorio", labRoutes);
app.use("/usuario", authRoutes);
app.use("/", videoTutorialRoutes);
app.use("/", temperaturaRoutes);

app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor!');
});

module.exports = app;
