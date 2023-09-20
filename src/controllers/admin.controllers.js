import bcrypt from 'bcrypt';
import { pool } from '../database.js';
export const dashboardAdmin = (req, res) => {
  res.render('admin/adminDashboard.ejs'); // Reemplaza 'pagina_administrador' con la ruta de tu página de administrador
}

export const handleActionNotAllowed = (req, res) => {
  res.render('notAllowedAction.ejs');
}
//Controlador para empleados
export const formRegisterEmployee = (req, res) => {
  res.render('admin/createEmployee.ejs');
}
export const registerEmployee = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  try {
    // Verifica si el empleado ya existe en la base de datos por correo
    const checkEmployeeQuery = 'SELECT * FROM usuarios WHERE correo = $1';
    const employee = await pool.query(checkEmployeeQuery, [correo]);

    if (employee.rows.length > 0) {
      // El empleado ya existe en la base de datos
      const storedHashedPassword = employee.rows[0].contraseña;

      bcrypt.compare(contraseña, storedHashedPassword, (err, result) => {
        if (err) {
          // Error al comparar las contraseñas
          console.error(err);
          res.status(500).send('Error en el servidor');
        } else if (result) {
          // Contraseña válida, puedes redirigir al empleado a donde necesites
          res.render('partials/alerts/welcomeEmployee.ejs');
        } else {
          // Contraseña incorrecta, muestra un mensaje de error
          res.render('partials/alerts/wrongPassword.ejs');
        }
      });
    } else {
      // El empleado no existe, crea un nuevo registro
      bcrypt.hash(contraseña, 10, async (err, hash) => {
        if (err) {
          // Error al cifrar la contraseña
          console.error(err);
          res.status(500).send('Error en el servidor');
        } else {
          // Registra al nuevo empleado en la base de datos
          const createUserQuery =
            'INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES ($1, $2, $3, $4)';
          await pool.query(createUserQuery, [nombre, correo, hash, 'employee']);

          // Redirige al administrador a donde necesites después del registro
          res.render('partials/alerts/registerEmployee.ejs');
        }
      });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const getAllEmployees = async (req, res) => {
  const checkEmployeeQuery = 'SELECT * FROM usuarios WHERE rol = $1';
  const rolEmpleado = 'employee';
  try {
    const { rows: empleados } = await pool.query(checkEmployeeQuery, [rolEmpleado]);
    res.json(empleados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};
export const updateEmployee = (req, res) => {
  res.send("Actualizando empleado")
}
export const toggleEmployee = (req, res) => {
  res.send("Cambiando el estado del empleado")
}
//Controlador para productos
export const getAllProducts = (req, res) => {
  res.send("Obteniendo productos")
}