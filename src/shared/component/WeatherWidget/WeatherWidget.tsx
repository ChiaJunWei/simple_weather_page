import { formatUnixDate } from "../../../utils/dateUtils";
import { formatTemperature, toTitleCase } from "../../../utils/inputUtils";
import { WeatherWidgetData } from "../../typings";
import "./WeatherWidget.css";
import { getWeatherImage } from "../../../utils/weatherImageUtils";

interface WeatherWidgetProps {
  data?: WeatherWidgetData; // The weather data (optional)
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data }) => {
  // If data is not provided, return an empty fragment
  if (!data) return <></>;

  return (
    <>
      <div className="weather-widget-container">
        {/* Title */}
        <p className="weather-widget-title">Today's Weather</p>
        {/* Current temperature */}
        <div className="weather-widget-current-temperature">
          {formatTemperature(data.temp)}
        </div>
        {/* Temperature range */}
        <div className="weather-widget-temperature-range">
          <div>H: {formatTemperature(data.temp_max)}</div>
          <div>L: {formatTemperature(data.temp_min)}</div>
        </div>
        {/* Weather icon */}
        <div className="weather-widget-icon-container">
          <img
            src={getWeatherImage(data.weather)}
            className="weather-widget-icon-img"
            alt="Sunny"
          />
        </div>
        {/* Country */}
        <div className="weather-widget-country">
          {data.city},{data.country}
        </div>
        {/* Timestamp */}
        <div className="weather-widget-timestamp">
          {formatUnixDate(data.timestamp)}
        </div>
        {/* Humidity */}
        <div className="weather-widget-humidity">
          Humidity: {data.humidity}%
        </div>
        {/* Weather description */}
        <div className="weather-widget-weather">
          {toTitleCase(data.weather)}
        </div>
      </div>
    </>
  );
};

export default WeatherWidget;
