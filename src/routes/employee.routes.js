import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.send("Página principal")
    
})
router.post('/employee', (req, res) => {
    res.send("Bienvenido empleado")
})
export default router;
