import { useState } from "react";
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
import LoadingOverlay from "../shared/component/LoadingOverlay/LoadingOverlay";
import ScrollToTopComponent from "../shared/component/ScrollToTopComponent/ScrollToTopComponent";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [widgetData, setWidgetData] = useState<WeatherWidgetData | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = async (searchItem: string) => {
    window.scrollTo(0, 0);
    if (searchItem.trim() !== "") {
      try {
        setIsloading(true);
        const data = await getWeatherApi(searchItem);

        const widgetData: WeatherWidgetData = {
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          humidity: data.main.humidity,
          country: data.sys.country,
          city: data.name,
          weather: data.weather[0].description,
          timestamp: dayjs().unix(),
          id: crypto.randomUUID(),
        };
        setWidgetData(widgetData);
        dispatch(addSearchHistory(widgetData));
        setSearchTerm("");
      } catch (error) {
        setIsError(true);
      } finally {
        setIsloading(false);
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-container">
        <div className="component-wrapper">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isError={isError}
            setIsError={setIsError}
            handleSearch={() => handleSearch(searchTerm)}
          />

          {widgetData ? (
            <>
              <div className="weather-table-wrapper">
                <WeatherWidget data={widgetData} />
                <SearchHistoryComponent
                  handleSelect={(item) => handleSearch(item.city)}
                  handleDeleteFromHistory={(item) => {
                    (item === widgetData || item === null) &&
                      setWidgetData(null);
                  }}
                />
              </div>
            </>
          ) : (
            <SearchHistoryComponent
              handleSelect={(item) => handleSearch(item.city)}
            />
          )}
        </div>
        <div className="scroll-to-top-component">
          <ScrollToTopComponent />
        </div>
      </div>
      {isLoading && (
        <div className="loading-overlay">
          <LoadingOverlay />
        </div>
      )}
    </div>
  );
}

export default App;
