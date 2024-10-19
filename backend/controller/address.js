// controller/address.js

const Address = require('../models/Address.js');

const addAddress = async (req, res) => {
    try {
        const {
            houseNo,
            street,
            city,
            state,
            pincode,
            phoneNumber
        } = req.body;
        const userId = req.userId;
        const address = new Address({
            user: userId,
            houseNo,
            street,
            city,
            state,
            pincode,
            phoneNumber,
        });
        await address.save();
        res.json({ msg: "Adress Added Successfully" });
    } catch (error) {
        console.error(error); // Corrected variable name
        res.status(500).json({ error: "Failed to add address" });
    }
};

const getAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addresses = await Address.find({ user: userId });
        res.json({ addresses }); // Return addresses in an object
    } catch (error) {
        console.error('Failed to get addresses:', error); // Corrected error message
        res.status(500).json({ error: "Failed to get addresses" }); // Corrected error message
    }
};


// Ensure that you are exporting the function correctly
module.exports = { addAddress, getAddress };
