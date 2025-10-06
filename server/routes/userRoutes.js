import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserData, storeRecentSearchedCities } from '../controllers/userController.js';

const useRouter = express.Router();

useRouter.get('/', protect, getUserData);
useRouter.post('/recent-searched-cities', protect, storeRecentSearchedCities);

export default useRouter;