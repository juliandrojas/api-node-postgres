export const home = (req, res) => {
    res.render('index.ejs');
}
export const login = (req, res) => {
    res.render('login.ejs');
    const email = req.body.email;
    console.log(email);
}