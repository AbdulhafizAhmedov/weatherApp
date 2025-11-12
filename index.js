import express from "express";
import { engine, create } from "express-handlebars";
import mongoose from "mongoose";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import * as dotenv from "dotenv";

// Routes
import AuthRoutes from "./routes/auth.js";
import CityRoutes from "./routes/cities.js"

// Middlewares
import warMiddleware from "./middleware/war.js";
import userMiddleware from "./middleware/userScan.js";
import cityMiddleware from "./middleware/cityScan.js";

dotenv.config();

const app = express();

const hbs = create({ defaultLayout: "main", extname: "hbs"});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({secret: "Weather", resave: false, saveUninitialized: false}));
app.use(flash());
app.use(warMiddleware);
app.use(userMiddleware);
app.use(cityMiddleware);

app.use(AuthRoutes);
app.use(CityRoutes);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.Weather_Url)
.then(() => console.log("MOngo DB started")
);


const PORT = process.env.PORT || 4100
app.listen(PORT, () => {
    console.log(`Server is running: ${PORT}`);
});