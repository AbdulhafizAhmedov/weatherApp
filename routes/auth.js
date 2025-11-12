import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/token.js";
import authMiddleware from "../middleware/authScan.js";

const router = Router();

router.get("/",  (req, res) => {
    res.render("index",{
        title: "Weather",
    });
});

router.get("/login", authMiddleware, (req, res) => {
    res.render("login", {
        title: "Login",
        isLogin: true,
        loginErr: req.flash("loginErr")
    });
});

router.get("/register", authMiddleware, (req, res) => {
    res.render("register", {
        title: "Register",
        isRegister: true,
        registerErr: req.flash("registerErr")
    });
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

// Post

router.post("/", (req, res) => {
    res.redirect("/cities");
    return;
});

router.post("/login", async  (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        req.flash("loginErr", "All field is required!");
        res.redirect("/login");
        return;
    }

    const existUser = await User.findOne({email})
    if (!existUser) {
        req.flash("loginErr", "Email or password wrong!");
        res.redirect("/login");
        return;
    }
    const isPassEqual = await bcrypt.compare(password, existUser.password)
    if (!isPassEqual) {
        req.flash("loginErr", "Email or password wrong!")
        res.redirect("/login");
        return;
    }

    const token = generateToken(existUser._id);
    res.cookie("token", token, {httpOnly: true, secure: true});
    res.redirect("/cities");
});

router.post("/register", async (req, res) => {
    const {firstname, lastname, email, password} = req.body;
    
    if (!firstname || !lastname || !email || !password) {
        req.flash("registerErr", "All field is required!");
        res.redirect("/register");
        return;
    }

    const candidate = await User.findOne({email});
    if (candidate) {
        req.flash("registerErr", "User already exists!");
        res.redirect("/register");
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userData = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: hashedPassword
    };
    
    const user = await User.create(userData);
    const token = generateToken(user._id);
    res.cookie("token", token, {httpOnly: true, secure: true});
    res.redirect("/cities");
});

export default router;