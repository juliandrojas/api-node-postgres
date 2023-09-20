import bcrypt from 'bcrypt';
import { pool } from '../database.js';
export const home = (req, res) => {
  res.render('index.ejs');
}
export const login = (req, res) => {
  res.render('login.ejs');
}
export const checkUser = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  console.log(req.body);
  try {
    // Verifica si el usuario ya existe en la base de datos por correo
    const checkUserQuery = 'SELECT * FROM usuarios WHERE correo = $1';
    const user = await pool.query(checkUserQuery, [correo]);
    if (user.rows.length > 0) {
      // El usuario existe, compara las contraseñas cifradas
      const storedHashedPassword = user.rows[0].contraseña;
      bcrypt.compare(contraseña, storedHashedPassword, (err, result) => {
        if (err) {
          // Error al comparar las contraseñas
          console.error(err);
          res.status(500).send('Error en el servidor');
        } else if (result) {
          // Contraseña válida, obtiene el rol del usuario
          const userRole = user.rows[0].rol;
          console.log(userRole);
          // Redirige al usuario según su rol
          if (userRole === 'admin') {
            res.render('partials/alerts/welcomeAdmin.ejs');
          } else if (userRole === 'employee') {
            res.redirect('/welcomeEmployee');
          }
        } else {
          // Contraseña incorrecta, puedes manejarlo de la manera que prefieras
          res.render('partials/alerts/wrongPassword.ejs');
        }
      });
    } else {
      res.render('infoCreateUser.ejs');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }

};
export const changeStatus = async (req, res) => {
  const { idusuario } = req.params; // Obtén el idusuario de la URL
  try {
    // Consulta la base de datos para obtener el estado actual del usuario
    const getStatusQuery = 'SELECT status FROM usuarios WHERE idusuario = $1';
    const userData = await pool.query(getStatusQuery, [idusuario]);
    
    if (userData.rows.length > 0) {
      // Obtén el estado actual del usuario
      const currentStatus = userData.rows[0].status;
      
      // Cambia el estado en función del estado actual
      const newStatus = currentStatus === 'Suspendido' ? 'Activo' : 'Suspendido';
      // Actualiza el estado en la base de datos
      const updateUserStatusQuery = 'UPDATE usuarios SET status = $1 WHERE idusuario = $2';
      await pool.query(updateUserStatusQuery, [newStatus, idusuario]);
      // Envía una respuesta exitosa
      res.render('partials/alerts/changeStatusEmployee.ejs');
    } else {
      // Maneja el caso en el que no se encuentra el usuario
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

