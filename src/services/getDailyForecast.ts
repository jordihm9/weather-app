import { ForecastType as Forecast, Coord } from './../App';

export const getCurrentWeather = async (coord: Coord): Promise<Forecast | null> => {
	const URL = 'https://api.openweathermap.org/data/2.5/onecall';
	const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
	const response = await fetch(`${URL}?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`);

	const data = await response.json();

	console.log(data);

	return data;
}