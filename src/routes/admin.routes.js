import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.send("Formulario de ingreso")
})
router.post('/dashboard', (req, res) => {
    res.send("Dashboard")
})
export default router;