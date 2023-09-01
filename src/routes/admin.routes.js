import { Router } from 'express';
const router = Router();
//Importamos los controladores de empleados
import { createEmployee, getAllEmployees, toggleEmployee, updateEmployee } from '../controllers/admin.controllers.js';
router.get('/getAllEmployees', getAllEmployees);
router.post('/createEmployee', createEmployee);
router.patch('/updateEmployee', updateEmployee);
router.patch('/toggleEmployee', toggleEmployee);
//Importamos los controladores de los productos
import { getAllProducts } from '../controllers/admin.controllers.js';
router.get('/getAllProducts', getAllProducts);
export default router;