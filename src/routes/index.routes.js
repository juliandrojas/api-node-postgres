import { Router } from 'express';
import { changeStatus, checkUser, home, login } from '../controllers/index.controllers.js';
//Importamos los controladores
const router = Router();
router.get('/', home);
router.get('/login', login);
router.post('/checkUser', checkUser);
router.get('/changeStatus/:idusuario', changeStatus);
export default router;