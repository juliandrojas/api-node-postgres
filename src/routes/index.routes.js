import { Router } from 'express';
import { home, login } from '../controllers/index.controllers.js';
//Importamos los controladores
const router = Router();
router.get('/', home);
router.get('/login', login);
export default router;