import { ForecastType as Forecast, Unit } from '../App';

export interface OpenWeatherFailedResponse {
  cod: number,
  message: string
}

const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const getCurrentWeather = async (
  location: string | GeolocationCoordinates,
  units: Unit = Unit.Standard
  ): Promise<Forecast & OpenWeatherFailedResponse> => {
  const apiWeatherURL = 'https://api.openweathermap.org/data/2.5/weather';
  let locationQuery: string;

  if (location instanceof GeolocationCoordinates) {
    locationQuery = `?lat=${location.latitude}&lon=${location.longitude}`;
  } else {
    locationQuery = `?q=${location}`;
  }

  const response = await fetch(`${apiWeatherURL}${locationQuery}&units=${units}&appid=${apiKey}`);

  return await response.json();
};

