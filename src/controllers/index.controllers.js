export const home = (req, res) => {
    res.render('index.ejs');
}
export const login = (req, res) => {
    res.render('login.ejs');
}
export const checkUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    // Expresión regular para verificar si el correo es "administrador@nombre.com"
    const adminEmailRegex = /^administrador@nombre\.com$/i;
    if (adminEmailRegex.test(email)) {
        // Redirigir a la página de administrador
        res.render('adminDashboard.ejs'); // Reemplaza 'pagina_administrador' con la ruta de tu página de administrador
    } else {
        // Redirigir a la página de empleados
        res.render('pagina_empleados'); // Reemplaza 'pagina_empleados' con la ruta de tu página de empleados
    }

}