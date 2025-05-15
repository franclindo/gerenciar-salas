const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: "Email ou senha inválidos" });
    }
};

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "Usuário já existe" });
    }

    const user = await User.create({ email, password });

    res.status(201).json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
    });
};

module.exports = { authUser, registerUser };
