import sunnyImg from "../shared/assets/sunny.png"
import cloudyImg from "../shared/assets/cloudy.png"

// Export a function to get the weather image based on the weather condition
export const getWeatherImage = (weather: string) => {
  // Check if the weather condition includes "rain" (case-insensitive)
  if (!weather.toLowerCase().includes("rain")) {
    // If it doesn't include "rain", return the sunny image
    return sunnyImg
  } else {
    // If it does include "rain", return the cloudy image
    return cloudyImg
  }
}