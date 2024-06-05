import express from 'express';
import { totalUser} from '../controllers/manageUsers.js';

const router = express.Router();

router.get('/totaluser', totalUser);
export default router;