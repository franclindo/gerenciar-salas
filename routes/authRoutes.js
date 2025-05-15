const express = require("express");
const router = express.Router();
const { authUser, registerUser } = require("../controllers/authController");
const User = require("../models/User");

router.post("/register", registerUser);

router.post("/login", authUser);

router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
    }
});

module.exports = router;
