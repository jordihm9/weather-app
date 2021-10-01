import { Fragment, useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { Body } from './components/Body';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Forecast } from './components/Forecast';

import { getCurrentWeather } from './services/getCurrentWeather';

export enum Unit {
  Standard = 'standard',
  Metric = 'metric',
  Imperial = 'imperial'
}

export type Coord = {
  lon: number,
  lat: number
}

export type Weather = {
  id: number,
  main: string,
  description: string
}

export type ForecastType = {
  name: string,
  coord: Coord,
  weather: Weather[],
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number
  }
}

export const App: React.FC = () => {
  const [unit] = useState(Unit.Metric);
  const [currentForecast, setCurrentForecast] = useState<ForecastType | null>(null);

  return (
    <Fragment>
      <Header>
        <Formik
					initialValues={{search: ''}}
					onSubmit={async values => setCurrentForecast(await getCurrentWeather(values.search, unit))}
					>
					<Form>
						<Field name="search" />
					</Form>
				</Formik>
      </Header>
      <Body>
        { currentForecast && <Forecast forecast={currentForecast} units={unit} /> }
      </Body>
      <Footer />
    </Fragment>
  );
}
