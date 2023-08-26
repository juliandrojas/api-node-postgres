import { Router } from 'express';
//Importamos los controladores
const router = Router();
router.get('/employees/login', (req, res) => {
    res.send("Página principal")
    
})
router.post('/employee', (req, res) => {
    res.send("Bienvenido empleado")
})
export default router;
