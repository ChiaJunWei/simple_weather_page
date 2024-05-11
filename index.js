const PORT = 8000


// const express = require('express');
// const cors=require('cors');
// const axios = require('axios');
// require('dotenv').config();


// const app=express()

// app.listen(8000,()=>{
//     console.log(`Server is running on port ${PORT}`)})

import express from 'express';
import cors from 'cors';
// import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

const OPEN_WEATHER_API_KEY = process.env.POKEMON_API_KEY;


app.get('/weather/:lat/:lon', async (req, res) => {
    const { lat, lon } = req.params; // Extracting latitude and longitude from request params

    try {
        const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const weatherData = await response.json();
        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

app.get('/weather/:city/:state/:country', async (req, res) => {
    const COORD_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';
    const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

    const { city, state, country } = req.params; // Extracting city, state, and country from request params
    const API_KEY = process.env.OPEN_WEATHER_API_KEY;

    try {
        const response = await fetch(`${COORD_API_URL}?q=${city},${state},${country}&limit=1&appid=${API_KEY}`);
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

        const weatherResponse = await fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
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
        console.error(error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});


app.listen(8000,()=>{
    console.log(`Server is running on port ${PORT}`)})