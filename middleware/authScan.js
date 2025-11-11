export default function (req, res, next) {
    if (req.cookies.token) {
        return res.redirect("/");
    }
    next();
};