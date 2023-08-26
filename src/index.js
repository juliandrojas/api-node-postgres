import express from 'express';
import morgan from 'morgan';
import './database.js';
import adminRoutes from './routes/admin.routes.js';
import employeeRoutes from './routes/employee.routes.js';
const app = express();
//Usamos las rutas de los empleados
app.use(adminRoutes);
app.use(employeeRoutes);
app.listen(3000) 
app.use(morgan('dev'));
console.log("Server running on port 3000")