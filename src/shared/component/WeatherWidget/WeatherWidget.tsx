import { WeatherWidgetData } from "../../typings";
interface WeatherWidgetProps {
  data?: WeatherWidgetData;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data }) => {
  return (
    <div>
      {data && (
        <div>
          <div>Temperature: {data.temp}</div>
          <div>Max Temperature: {data.temp_max}</div>
          <div>Min Temperature: {data.temp_min}</div>
          <div>Humidity: {data.humidity}</div>
          <div>Country: {data.country}</div>
          <div>Name: {data.city}</div>
          <div>Weather: {data.weather}</div>
          <div>time: {data.time}</div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
