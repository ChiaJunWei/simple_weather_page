import sunnyImg from "../shared/assets/sunny.png"
import cloudyImg from "../shared/assets/cloudy.png"

//refer to https://openweathermap.org/weather-conditions for different weather conditions, ideally different images for different weather conditions can be added here
export const getWeatherImage = (weather: string) => {
    if (!weather.toLowerCase().includes("rain")) {
        return sunnyImg
    } else {
        return cloudyImg
    }
}