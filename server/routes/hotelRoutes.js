import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { registerHotel, checkUserHasHotel} from '../controllers/hotelController.js';

const hotelRouter = express.Router();

hotelRouter.post('/', protect, registerHotel);
hotelRouter.get('/owner', protect, checkUserHasHotel);

export default hotelRouter;