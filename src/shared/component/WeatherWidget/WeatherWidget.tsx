import { formatUnixDate } from "../../../utils/dateUtils";
import { formatTemperature, toTitleCase } from "../../../utils/inputUtils";
import { WeatherWidgetData } from "../../typings";
import "./WeatherWidget.css";
import sunny from "../../assets/sun.png";
interface WeatherWidgetProps {
  data?: WeatherWidgetData;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data }) => {
  return (
    <div className="weather-widget-container">
      {data && (
        <>
          <div className="weather-widget-temperature-container">
            <div className="weather-widget-temperature">
              <p>Today's Weather</p>
              <div className="weather-widget-current-temperature">
                {formatTemperature(data.temp)}
              </div>
              <div className="weather-widget-temperature-range">
                <div>H: {formatTemperature(data.temp_max)}</div>
                <div>L: {formatTemperature(data.temp_min)}</div>
              </div>
            </div>
            <div className="weather-widget-icon-container">
              <img
                src={sunny}
                className="weather-widget-icon-img"
                alt="Sunny"
              />
            </div>
          </div>

          <div className="weather-widget-details-container">
            <div className="weather-widget-country">
              {data.city},{data.country}
            </div>
            <div> {formatUnixDate(data.timestamp)}</div>
            <div> Humidity: {data.humidity}%</div>
            <div> {toTitleCase(data.weather)}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
