const weekdayMiddleware = (req, res, next) => {
    const day = new Date().getDay();
    if (day >= 1 && day <= 5) return next();
    res.status(403).json({ message: "Acesso somente de segunda a sexta" });
};
module.exports = weekdayMiddleware;