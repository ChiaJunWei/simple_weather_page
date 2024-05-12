import { useState } from "react";
import "./App.css";
import SearchBar from "../shared/component/SearchBar/SearchBar";
import { getWeatherApi } from "../utils/api/weatherApi";
import { WeatherWidgetData } from "../shared/typings";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { addSearchHistory } from "../features/SearchHistoryTable/SearchHistorySlice";
import WeatherWidget from "../shared/component/WeatherWidget/WeatherWidget";
import dayjs from "dayjs";
import LoadingOverlay from "../shared/component/LoadingSpinner/LoadingSpiner";
import ScrollToTopComponent from "../shared/component/ScrollToTopComponent/ScrollToTopComponent";
import SearchHistoryComponent from "../features/SearchHistoryTable/SearchHistoryComponent";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // search term input
  const [isError, setIsError] = useState(false); // error flag
  const [isLoading, setIsloading] = useState(false); // loading flag
  const [widgetData, setWidgetData] = useState<WeatherWidgetData | null>(null);

  // Get the dispatch function from Redux
  const dispatch = useDispatch<AppDispatch>();

  // Handle search functionality
  const handleSearch = async (searchItem: string) => {
    window.scrollTo(0, 0);
    if (searchItem.trim() !== "") {
      try {
        // Set loading state
        setIsloading(true);
        // Fetch weather data from API
        const data = await getWeatherApi(searchItem);
        // Extract and format weather data
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
          searchTerm: searchItem,
        };
        setWidgetData(widgetData);
        // Add search history to Redux store
        dispatch(addSearchHistory(widgetData));
        // Clear search input
        setSearchTerm("");
      } catch (error) {
        // Set error flag on failure
        setIsError(true);
      } finally {
        // Set loading state to false
        setIsloading(false);
      }
    }
  };

  return (
    <div
      className="page-wrapper"
      style={{
        cursor: isLoading ? "not-allowed" : "auto",
      }}
    >
      <div className="page-container">
        <div className="component-wrapper">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isError={isError}
            setIsError={setIsError}
            handleSearch={() => handleSearch(searchTerm)}
            isLoading={isLoading}
          />
          {/* Display Weather widget and search history components if widget data is available */}
          {widgetData ? (
            <>
              <div className="weather-table-wrapper">
                <WeatherWidget data={widgetData} />
                <SearchHistoryComponent
                  isLoading={isLoading}
                  handleSelect={(item) => handleSearch(item.city)}
                  handleDeleteFromHistory={(item) => {
                    (item === widgetData || item === null) &&
                      setWidgetData(null);
                  }}
                />
              </div>
            </>
          ) : (
            //  Display search history component if widget data is not available
            <SearchHistoryComponent
              handleSelect={(item) => handleSearch(item.searchTerm)}
              isLoading={isLoading}
            />
          )}
        </div>
        {/* Scroll to top component */}
        <div className="scroll-to-top-component">
          <ScrollToTopComponent />
        </div>
      </div>
      {/* Loading overlay if isLoading is true */}
      {isLoading && (
        <div className="loading-overlay">
          <LoadingOverlay />
        </div>
      )}
    </div>
  );
}

export default App;
