const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const labRoutes = require("./routes/labRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.error("Erro ao conectar no Mongo:", err));


app.use("/api/laboratorio", labRoutes);
app.use("/api/usuario", authRoutes);

app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor!');
});

module.exports = app;
