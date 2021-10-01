import { Weather } from './../App';

interface Props {
	weather: Weather
}

export const ConditionImage: React.FC<Props> = ({ weather }) => {
	const getConditionImageName = (id: number): string => {
		switch (Math.floor(id / 100)) {
			case 2: // Thunderstorm
				return 'thunderstorm';
			case 3: // Drizzle
				return 'drizzle';
			case 5: // Rain
				return id === 511 ? 'freezing-rain' : 'rain';
			case 6: // Snow 60x
				return 'snow';
			case 7: // Atmosphere
				return 'fog';
			case 8: // Clear 800 + Clouds 80x
				return id === 800 ? 'clear' : 801 ? 'few-clouds' : 'clouds';
			default:
				return 'Error!';
		}
	}

	const img = getConditionImageName(weather.id)

	return (
		<img src={`weather-icons/${img}.svg`} alt={img} />
	);
}
