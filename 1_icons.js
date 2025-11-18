const caseOne = temp => {
    if (temp) return "sunny"
};

const caseTwo = temp => {
    if (temp) return "cloudy"
};

const caseThree = temp => {
    if (temp) return "light-cloudy"
};

const caseFour = temp => {
    if (temp) return "heavy-cloudy"
};

const caseNine = temp => {
    if (temp) return "rain"
};

const caseTen = temp => {
    if (temp) return "rainy"
};

const caseEleven = temp => {
    if (temp) return "stormy"
};

const caseThirteen = temp => {
    if (temp) return "snowy"
};

const caseFifty = temp => {
    if (temp) return "misty"
};

const getIcons = (icon, temp) => {
    let icons = "";

    const sliceIcon = icon.slice(0,-1)
    switch (sliceIcon) {
        case "01":
            return {className: "sun", iconName: "bi bi-brightness-high-fill text-warning"}

        case "02":
            return {className: "sunny-cloud", iconName: "bi bi-sun-fill sunny", specIcon: "bi bi-cloud-fill cloudy"}

        case "03":
            return {className: "light-cloud", iconName: "bi bi-cloud-fill text-light"}

        case "04":
            return {className: "heavy-cloud", iconName: "bi bi-cloud-fill text-dark heavy1_cloud", specIcon: "bi bi-cloud-fill text-light heavy2_cloud"}

        case "09":
            return {className: "rain", iconName: "bi bi-cloud-drizzle-fill text-light"}

        case "10":
            return {className: "rainy", iconName: "bi bi-sun-fill sunny", specIcon: "bi bi-cloud-drizzle-fill cloudy"}

        case "11":
            return {className: "storm", iconName: "bi bi-cloud-lightning-rain-fill"}

        case "13":
            return {className: "snow", iconName: "bi bi-cloud-snow-fill text-light"}

        case "50":
            return {className: "mist", iconName: "bi bi-cloud-fog2-fill text-light"}

        default:
            return {className: "default", iconName: "default"}     
    };
}; 

export { getIcons };