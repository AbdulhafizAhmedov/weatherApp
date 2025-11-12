import City from "../models/city.js";
import userMiddleware from "./userScan.js";

export default async function (req, res, next) {
    const user = req.userId ? req.userId.toString(): null;
    const cities = await City.find({user}).populate("user").lean();
    const isCities = !cities ? true: false;
    res.locals.cities = isCities;
    
    next();
};