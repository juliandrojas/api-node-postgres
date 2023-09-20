import { Router } from 'express';
const router = Router();
//Importamos los controladores de empleados
import { dashboardAdmin, formRegisterEmployee, getAllEmployees, handleActionNotAllowed, registerEmployee, toggleEmployee } from '../controllers/admin.controllers.js';
//Si se intenta acceder al dashboard desde la URL
router.get('/dashboard', handleActionNotAllowed);

router.post('/dashboard', dashboardAdmin);
router.get('/createEmployee', formRegisterEmployee);
router.post('/registerEmployee', registerEmployee);
router.get('/getAllEmployees', getAllEmployees);
router.post('/createEmployee', registerEmployee);
//router.patch('/changeStatus/:idusuario', updateEmployee);
router.patch('/toggleEmployee', toggleEmployee);
//Importamos los controladores de los productos
import { getAllProducts } from '../controllers/admin.controllers.js';
router.get('/getAllProducts', getAllProducts);
export default router;