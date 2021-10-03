import { ForecastType as Forecast, Unit } from './../App';
import { OpenWeatherFailedResponse } from './interfaces';

const apiWeatherURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const getCurrentWeather = async (
  cityName: string,
  units: Unit = Unit.Standard
): Promise<Forecast & OpenWeatherFailedResponse> => {
  const response = await fetch(`${apiWeatherURL}?q=${cityName}&units=${units}&appid=${apiKey}`);
  const data = await response.json();

  return data;
};
