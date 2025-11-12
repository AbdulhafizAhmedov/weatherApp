import cityMiddleware from "./cityScan.js";

export default async function (req, res, next) {
    const cities = req.myCities;
    if (cities.length) {
        const isCity = cities ? true:false;
        res.locals.cities = isCity;
    }
    
    next();
};