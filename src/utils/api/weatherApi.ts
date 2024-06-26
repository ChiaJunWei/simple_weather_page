// Import the WeatherResponse type from the shared typings
import { WeatherResponse } from "../../shared/typings";

// Define the base URL for the weather API
let WEATHER_API_ENDPOINT;
if (import.meta.env.DEV) {
    WEATHER_API_ENDPOINT = import.meta.env.VITE_WEATHER_LOCAL_API_URL; //developement mode api
} else {
    WEATHER_API_ENDPOINT = import.meta.env.VITE_WEATHER_API_URL; //production mode api
}

export const getWeatherApi = async (city: string) => {
  // Construct the API URL with the city parameter
  const url = `${WEATHER_API_ENDPOINT}/weather/${city}`;
  // Fetch the data from the API
  const res = await fetch(url);
  // Check if the response is OK (200-299 status code)
  if (!res.ok) {
    // If not, throw an error with the status text
    throw new Error(res.statusText);
  }
  // Parse the response data as JSON
  const data: WeatherResponse = await res.json(); // Wait for JSON parsing
  // Return the parsed data
  return data;
};