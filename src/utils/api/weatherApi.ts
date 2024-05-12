// Import the WeatherResponse type from the shared typings
import { WeatherResponse } from "../../shared/typings";

// Define the base URL for the weather API
const getCoordApiUrl = 'https://weather-api-backend-chiajunwei-chiajunweis-projects.vercel.app/weather';

export const getWeatherApi = async (city: string) => {
  // Construct the API URL with the city parameter
  const url = `${getCoordApiUrl}/${city}`;
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