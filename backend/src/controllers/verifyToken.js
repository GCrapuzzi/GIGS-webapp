const verifyToken = async (req, res) => {
    return res.status(200).json({ message: "Token valido" });
}

module.exports = verifyToken;