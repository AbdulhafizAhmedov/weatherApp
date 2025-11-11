const citySearch = (cityList, cityname) => { 
    if (!Array.isArray(cityList)) return false;
    if (!cityname) return false;

    const comparison = cityname.toLowerCase();
    return cityList.some(city => city.toLowerCase() === comparison);
};

export {citySearch};