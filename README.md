# Weather App

## Run locally
### Environment variables
Go to [Open Weather](https://openweathermap.org) and request an API key.
Make a copy of `.env.production` to `.env`.
```shell
cp .env.production .env
```
Open the `.env` file and put the api key to `REACT_APP_OPENWEATHER_API_KEY` key.

### Start
```shell
docker-compose up
```

### Stop
```shell
docker-compose down
```

 > This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
