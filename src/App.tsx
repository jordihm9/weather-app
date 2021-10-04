import { Fragment, useEffect, useState } from 'react';
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

const searchPhraseStorageKey = 'lastSearchPhrase';

export const App: React.FC = () => {
  const [unit] = useState(Unit.Metric);
  const [currentForecast, setCurrentForecast] = useState<ForecastType | null>(null);

  const fetchWeather = async (searchPhrase: string): Promise<Weather & void> => {
    const result = await getCurrentWeather(searchPhrase, unit);

    if (result.cod !== 200) {
      throw new Error(`Error while fetching weather: ${result.message}`);
    }

    setCurrentForecast(result)
    localStorage.setItem(searchPhraseStorageKey, result.name);
  }

  useEffect(() => {
    const lastSearchPhrase = localStorage.getItem(searchPhraseStorageKey);

    if (!lastSearchPhrase) return;

    fetchWeather(lastSearchPhrase).catch(console.error)
  }, []); // eslint-disable-line

  return (
    <Fragment>
      <Header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await fetchWeather(values.search);
              resetForm();
            } catch (error) {
              // TODO: error handling
              console.error(error);
            }
          }}
        >
          <Form>
            <div className='search-input'>
              <Field name='search' placeholder='Location...' />
              <span className='icon' />
            </div>
          </Form>
        </Formik>
      </Header>
      <Body>{currentForecast && <Forecast forecast={currentForecast} units={unit} />}</Body>
      <Footer />
    </Fragment>
  );
}
