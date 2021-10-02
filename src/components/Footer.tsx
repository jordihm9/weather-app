import { Link } from './Link';

import './Footer.css';

export const Footer: React.FC = () => {
	return (
		<footer>
			<ul>
				<li>
					Powered by: <Link href="https://openweathermap.org" text="OpenWeather" />
				</li>
				<li>
					Icon Pack by: <Link href="https://iconscout.com/icon-pack/weather-daylight-icons" text="Amedia Utvikling" />
				</li>
			</ul>
		</footer>
	);
}
