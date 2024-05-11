import React, { useState } from "react";
import SearchHistoryComponent from "../features/searchHistoryTable/searchHistoryComponent";
import "./App.css";
import SearchBar from "../shared/component/SearchBar/SearchBar";
import { getWeatherApi } from "../utils/api/weatherApi";
import { WeatherWidgetData } from "../shared/typings";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { addSearchHistory } from "../features/searchHistoryTable/searchHistorySlice";
import WeatherWidget from "../shared/component/WeatherWidget/WeatherWidget";
import dayjs from "dayjs";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isError, setIsError] = useState(false);
  // const [searchHistory, setSearchHistory] = useState<WeatherWidgetData[]>([]);
  const [widgetData, setWidgetData] = useState<WeatherWidgetData>();

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      try {
        const data = await getWeatherApi(searchTerm);
        const widgetData: WeatherWidgetData = {
          temp: data.main.temp.toString(),
          temp_max: data.main.temp_max.toString(),
          temp_min: data.main.temp_min.toString(),
          humidity: data.main.humidity.toString(),
          country: data.sys.country,
          city: data.name,
          weather: data.weather[0].description,
          timestamp: dayjs().unix(),
          id: crypto.randomUUID(),
        };
        setWidgetData(widgetData);
        // setSearchHistory((prevHistory) => [...prevHistory, widgetData]);
        dispatch(addSearchHistory(widgetData));
        setSearchTerm("");
      } catch (error) {
        setIsError(true);
      }
    }
  };
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="page-container">
      <div className="component-wrapper">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isError={isError}
          setIsError={setIsError}
          handleSearch={handleSearch}
        />
        <WeatherWidget data={widgetData} />
        <SearchHistoryComponent handleSelect={(item) => setWidgetData(item)} />
      </div>
    </div>
  );
}

export default App;
