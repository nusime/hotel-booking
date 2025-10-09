import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
    try {
        const {name, address, contact, city} = req.body;
        const owner = req.user._id;

        // Check if the user is already registered
        const hotel = await Hotel.findOne({owner});
        if (hotel) {
            return res.status(400).json({success: false, message: 'Hotel already registered'});
        }

        await Hotel.create({
            name,
            address,
            contact,
            city,
            owner
        });

        await User.findByIdAndUpdate(owner, {role: 'hotelOwner'});

        res.status(201).json({success: true, message: 'Hotel registered successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const checkUserHasHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id }); // or req.user.id depending on your auth
    res.json({ hasHotel: !!hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};