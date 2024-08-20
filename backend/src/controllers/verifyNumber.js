const User = require("../models/userSchema");
import { validateNumber } from "../validators/validateNumber";

const verifyNumber = async (req, res) => {
    const { number } = req.body;
    if (!validateNumber(number)) {
        return res.status(400).json({ message: "Numero non valido" });
    }
    const numberExist = await User.exists({ number });
    if (numberExist){
         return res.status(400).send({ message: "Number already exists" });
    }
}

module.exports = verifyNumber;  