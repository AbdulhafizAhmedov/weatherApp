import { response, Router } from "express";
import City from "../models/city.js";
import {getWeather, getIcons} from "../0_weather.js"
import userMiddleware from "../middleware/userScan.js";
import cityMiddleware from "../middleware/cityScan.js";
import { citySearch } from "../comparison.js";

const router = Router();

router.get("/cities", cityMiddleware, userMiddleware, async (req, res,) => {
    try {
        const weatherData = await Promise.allSettled(req.myCities.map(city => getWeather(city)));
        const response = weatherData.filter(r => r.status === "fulfilled").map(r => r.value);
        const user = req.userId ? req.userId.toString(): null;
        const citiesList = await City.find({user}).populate("user").lean();
        
        const responseWidthFloor = response.map(city => {
            return {
                ...city,
                main: {
                    ...city.main,
                    temp: Math.floor(city.main.temp)
                }
            };
        });

        const Icons = responseWidthFloor.map(city => {  
            return { 
                ...city, 
                icon: getIcons(city.weather[0].icon)
            }
            }
        ); 

        res.render("cities", {
            myCities: Icons.reverse() ,
            cityErr: req.flash("cityErr")
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server error"});
    };
});

router.get("/delete", userMiddleware, async (req, res) => {
    const user = req.userId ? req.userId.toString(): null;

    if (user) {
        const deleteCity = await City.deleteMany({user: user});
        
        req.flash("deleted", "All cities succesfully deleted!")
        
        res.redirect("/");

        return res.render("index", {
            deleted: req.flash("deleted")
        });
        
    } else {
        console.log("User not found!");
    }
});

router.post("/cities", userMiddleware, cityMiddleware, async (req, res) => {
    const { cityname } = req.body;
    const cityList = req.myCities;
    
    if (!cityname) {
        console.log("Error");
        return res.status(400).json({ error: "cityname required" });
    }

    if (citySearch(cityList, cityname)) {
        req.flash("cityErr", "City already exists!");
        return res.redirect("/cities");
    };

    try {
        const weatherData = await Promise.allSettled(req.myCities.map(city => getWeather(city)));
        let response = weatherData.filter(r => r.status === "fulfilled").map(r => r.value);
        
        const newWeather = await getWeather(cityname);
        response.push(newWeather);
        
        const responseWidthFloor = response.map(city => {
            return {
                ...city,
                main: {
                    ...city.main,
                    temp: Math.floor(city.main.temp)
                }
            };
        });

        const Icons = responseWidthFloor.map(city => {  
            return { 
                ...city, 
                icon: getIcons(city.weather[0].icon)
            }
            }
        ); 

        await City.create({ciTy: cityname, user: req.userId});

        return res.render("cities", {
            myCities: Icons.reverse(),
            cityErr: req.flash("cityErr")
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            req.flash("cityErr", "City not found");
            return res.redirect("/cities");
        }
        console.error("There was an error retrieving weather information!", error);
        return res.status(500).json({error: "City not found or server error!"})
    }
});

export default router;