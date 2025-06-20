import { Router } from 'express';
import { getAllBurgers } from '../controllers/burgerController';

const router: Router = Router();

router.get('/all', getAllBurgers);

export default router;