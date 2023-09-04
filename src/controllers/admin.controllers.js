export const dashboardAdmin = (req, res) => {
      res.render('admin/adminDashboard.ejs'); // Reemplaza 'pagina_administrador' con la ruta de tu página de administrador
}
//Controlador para empleados
export const createEmployee = (req, res) => {
    res.send("Creando empleado")
}
export const getAllEmployees = (req, res) => {
    res.send("Listando todos los empleados")
}
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