import bcrypt from 'bcrypt';
export const home = (req, res) => {
    res.render('index.ejs');
}
export const login = (req, res) => {
    res.render('login.ejs');
}
export const checkUser = (req, res) => {
    const { nombre, email, password } = req.body;
    /*console.log("Nombre: " + nombre);
    console.log("Correo: " + email);
    console.log("Contraseña:" + password);*/
    // Expresión regular para verificar si el correo es "admin@admin.com"
    const adminEmailRegex = /^admin@admin\.com$/i;
    if (adminEmailRegex.test(email)) {
        // Ciframos la contraseña antes de hacer cualquier cosa
        bcrypt.hash(password, 10, (err, hash) => { // 10 es el número de rondas de cifrado
            if (err) {
                // Manejo de errores
                console.error(err);
                res.status(500).send("Error en el servidor");
            } else {
                // Imprime el hash en la consola o envíalo como respuesta JSON para depuración
                console.log("Contraseña cifrada:", hash);
                //Hacemos la 
                //res.json("Es administrador"); // Esto se puede usar para propósitos de depuración
                res.redirect('/admin/dashboard');
            }
        });
    } else {
        // Redirigir a la página de empleados
        res.render('pagina_empleados'); // Reemplaza 'pagina_empleados' con la ruta de tu página de empleados
    }
}