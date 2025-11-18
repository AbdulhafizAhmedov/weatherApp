import axios from "axios";
import City from "./models/city.js";

const getIcons = icon => {
    const sliceIcon = icon.slice(0,-1)
    switch (sliceIcon) {
        case "01":
            return "sunny"
        case "02":
            return "cloudy"
        case "03":
            return "light-cloud"
        case "04":
            return "heavy-cloud"
        case "09":
            return "rain"
        case "10":
            return "rainy"
        case "11":
            return "storm" 
        case "13":
            return "snow"
        case "50":
            return "mist" 
        default:
            return "default-weather"     
    };
    
}; 

const getWeather = async city => {
    const token = process.env.TOKEN;
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: city,
            appid: token,
            lang: "en",
            units: "metric"
        },
        headers: {"Cache-control": "no-cache"}
    });
    
    return response.data;
};



export {getWeather, getIcons};