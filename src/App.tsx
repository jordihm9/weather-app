import { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field, FormikHelpers, FormikValues } from 'formik';

import { Body } from './components/Body';
import { AlertMessage } from './components/AlertMessage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Forecast } from './components/Forecast';

import { getCurrentWeather } from './services/getCurrentWeather';

import { OpenWeatherFailedResponse } from './services/interfaces';

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
  const [error, setError] = useState<OpenWeatherFailedResponse | null>(null);
  const [currentForecast, setCurrentForecast] = useState<ForecastType | null>(null);

  useEffect(() => {
    const lastSearchPhrase = localStorage.getItem(searchPhraseStorageKey);

    if (!lastSearchPhrase) return;

    fetchWeather(lastSearchPhrase).catch(console.error)
  }, []); // eslint-disable-line

  const fetchWeather = async (searchPhrase: string): Promise<void> => {
    const result = await getCurrentWeather(searchPhrase, unit);

    if (result.cod !== 200) {
      setError(result);
      setCurrentForecast(null);
      localStorage.removeItem(searchPhraseStorageKey);
    } else {
      setCurrentForecast(result);
      localStorage.setItem(searchPhraseStorageKey, result.name);
    }
  }

  const handleSubmit = async (values: FormikValues, { resetForm }: FormikHelpers<{search: string}>) => {
    await fetchWeather(values.search);
    resetForm();
  }

  const validateSubmit = (values: FormikValues): FormikValues => {
    const errors: FormikValues = {};

    if (!values.search) errors.search = 'Required!';

    return errors;
  }

  return (
    <Fragment>
      <Header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={handleSubmit}
          validate={validateSubmit}
        >
          <Form>
            <div className='search-input'>
              <Field name='search' placeholder='Location...' />
              <button type="submit" className="icon" />
            </div>
          </Form>
        </Formik>
      </Header>
      <Body>
        { currentForecast ?
            <Forecast forecast={currentForecast} units={unit} />
          : error &&
            <AlertMessage msg="Location not found!" />
        }
      </Body>
      <Footer />
    </Fragment>
  );
}
