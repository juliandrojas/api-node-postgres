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
          } else {
            // Manejar otros roles si es necesario
            res.status(403).send('Rol no autorizado');
          }
        } else {
          // Contraseña incorrecta, puedes manejarlo de la manera que prefieras
          res.render('partials/alerts/wrongPassword.ejs');
        }
      });
    } else {
      // El usuario no existe, crea un nuevo registro
      bcrypt.hash(contraseña, 10, async (err, hash) => {
        if (err) {
          // Error al cifrar la contraseña
          console.error(err);
          res.status(500).send('Error en el servidor');
        } else {
          // Registra al nuevo usuario en la base de datos
          const createUserQuery =
            'INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES ($1, $2, $3, $4)';
          await pool.query(createUserQuery, [nombre, correo, hash, 'admin']);

          // Redirige al dashboard después del registro
          res.redirect('/admin/dashboard');
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }

};
export const changeStatus = async (req, res) => {
  const { idusuario } = req.params; // Obtén el idusuario de la URL

  try {
    // Consulta la base de datos para obtener los datos completos de la fila
    const userData = await pool.query('SELECT * FROM usuarios WHERE idusuario = $1', [idusuario]);

    if (userData.rows.length > 0) {
      const { nombre, correo, status } = userData.rows[0];
      
      // Ahora puedes usar nombre, correo, status, etc., en tu controlador
      console.log(nombre, correo, status);
      res.send("Usuario encontrado")
    } else {
      // Maneja el caso en el que no se encuentra el usuario
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};
