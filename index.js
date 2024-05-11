/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

const PORT = 8000

const API_KEY = process.env.OPEN_WEATHER_API_KEY;
const COORD_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

app.get('/weather/:city/', async (req, res) => {
    const { city } = req.params; // Extracting city, state, and country from request params
    try {
        const response = await fetch(`${COORD_API_URL}?q=${city}&limit=1&appid=${API_KEY}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Location not found');
            } else if (response.status === 429) {
                throw new Error('API rate limit exceeded');
            } else {
                throw new Error(`Failed to fetch location data: ${response.statusText}`);
            }
        }
        const locationData = await response.json();


        if (locationData.length === 0) {
            throw new Error('Location not found');
        }

        const { lat, lon } = locationData[0];
        const weatherResponse = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        if (!weatherResponse.ok) {
            if (weatherResponse.status === 404) {
                throw new Error('Weather data not found');
            } else if (weatherResponse.status === 429) {
                throw new Error('API rate limit exceeded');
            } else {
                throw new Error(`Failed to fetch weather data: ${weatherResponse.statusText}`);
            }
        }
        const weatherData = await weatherResponse.json();
        
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});



app.listen(8000,()=>{
    console.log(`Server is running on port ${PORT}`)})