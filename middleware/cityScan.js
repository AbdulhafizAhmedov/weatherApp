import City from "../models/city.js";
import userMiddleware from "../middleware/userScan.js";

export default async function (req, res, next) {
    const user = req.userId ? req.userId.toString(): null
    const citiesList = await City.find({user}).populate("user").lean();
    const myCities = citiesList.map(c => c.ciTy);
    req.myCities = myCities;
    
    next()
}