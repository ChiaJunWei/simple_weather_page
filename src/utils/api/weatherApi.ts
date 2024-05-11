
const getCoordApiUrl='http://localhost:8000/weather'


export const getWeatherApi = async (city: string) => {
  const res = await fetch(`${getCoordApiUrl}/${city}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json(); // Wait for JSON parsing
};