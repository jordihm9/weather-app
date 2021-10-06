import { Fragment, useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { Body } from './components/Body';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Forecast } from './components/Forecast';

import { getCurrentWeather } from './services/getCurrentWeather';

import './components/Input.css';

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

  const tempUnit = (): any => {
    switch (unit) {
      case Unit.Metric:  return 'ºC';//'&#8451;'
      case Unit.Imperial: return 'ºF';//'&#8457;'
      default: return 'K';//'&#8490;'
    }
  }
  return (
    <Fragment>
      <Header>
        <Formik
					initialValues={{search: ''}}
					onSubmit={async (values, {resetForm}) => {
            setCurrentForecast(await getCurrentWeather(values.search, unit));
            resetForm();
          }}
					>
					<Form>
            <div className="search-input">
              <Field name="search" placeholder="Location..." />
              <span className="icon" />
            </div>
					</Form>
				</Formik>
      </Header>
      <Body>
        { currentForecast && <Forecast forecast={currentForecast} units={tempUnit()} /> }
      </Body>
      <Footer />
    </Fragment>
  );
}
