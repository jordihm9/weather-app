import { useState } from 'react';

export const useGeolocation = () => {
	const [geolocation, setGeolocation] = useState<
		GeolocationPosition |
		GeolocationPositionError |
		null
	>(null);

	const getGeolocation = (): void => {
		navigator.geolocation.getCurrentPosition((pos) => {
			setGeolocation(pos);
		}, (error) => {
			setGeolocation(error);
			console.warn(error);
		});
	}

	return {geolocation, getGeolocation};
}
