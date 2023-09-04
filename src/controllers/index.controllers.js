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
            // Contraseña válida, redirige al dashboard
            res.render('partials/alerts/welcomeAdmin.ejs');
          } else {
            // Contraseña incorrecta, puedes manejarlo de la manera que prefieras
            //res.status(401).send('Contraseña incorrecta');
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
      console.error('Error al procesar la solicitud:', error);
      res.status(500).send('Error interno del servidor');
    }
  };