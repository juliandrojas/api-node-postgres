import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'; // Importa la función fileURLToPath
import './database.js';
import adminRoutes from './routes/admin.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

// Obtén la ruta del directorio actual utilizando import.meta.url y fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuramos ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Configuramos body-parser para el manejo de solicitudes
app.use(bodyParser.urlencoded({ extended: true }));

// Configuramos el middleware morgan para el registro de solicitudes
app.use(morgan('dev'));

// Usamos las rutas
app.use('/', indexRoutes);
app.use('/admin/', adminRoutes);
app.use('/employee/', employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
