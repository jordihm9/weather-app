import { Unit } from './../App';

export const useTemperatureConverter = () => {
	const converter = (temp: number, fromUnit: Unit, toUnit: Unit): number => {
		switch (fromUnit) {
			case Unit.Metric:
				switch (toUnit) {
					case Unit.Imperial:
						temp = temp * 9/5 + 32;
						break;
					case Unit.Standard:
						temp = temp + 273.15;
						break;
				}
				break;
			case Unit.Imperial:
				switch (toUnit) {
					case Unit.Metric:
						temp = (temp - 32) * 5/9;
						break;
					case Unit.Standard:
						temp = (temp + 459.67) * 5/9;
						break;
				}
				break;
			case Unit.Standard:
				switch (toUnit) {
					case Unit.Metric:
						temp = temp - 273.15;
						break;
						case Unit.Imperial:
						temp = temp * 9/5 - 459.67;
						break;
				}
				break;
		}

		return temp;
	}

	return converter;
}