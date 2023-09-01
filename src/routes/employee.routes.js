import { Router } from 'express';
//Importamos los controladores
const router = Router();
router.get('/login', (req, res) => {
    res.send("Página principal")
    
})
router.post('/dashboard', (req, res) => {
    res.send("Bienvenido empleado")
})
export default router;
