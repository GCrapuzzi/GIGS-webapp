const User = require("../models/userSchema");
import { validateNumber } from "../validators/validateNumber";
import { generateOTP } from "../utils/generateOTP";

const verifyNumber = async (req, res) => {
    const { number } = req.body;
    if (!validateNumber(number)) {
        return res.status(400).json({ message: "Numero non valido" });
    }
    const numberExist = await User.findOne({ number });
    if (numberExist){
        
    }
}

module.exports = verifyNumber;