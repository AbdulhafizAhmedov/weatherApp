import axios from "axios";
import City from "./models/city.js";

const getIcons = icon => {
    const sliceIcon = icon.slice(0,-1)
    switch (sliceIcon) {
        case "01":
            return "☀"
        case "02":
            return "🌥"
        case "03":
            return "☁"
        case "04":
            return "☁"
        case "09":
            return "🌧"
        case "10":
            return "🌦"
        case "11":
            return "🌩" 
        case "13":
            return "❄"
        case "50":
            return "🪟" 
        default:
            return "❓"     
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