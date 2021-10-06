# Weather App

Install the dependencies using:
```
yarn install
```

# Development
1. Go to [Open Weather](https://openweathermap.org) and request an API key.
2. Make a copy of `.env.production` to `.env`.
```
cp .env.production .env
```
3. Open the `.env` file and put the api key to `REACT_APP_OPENWEATHER_API_KEY` key.
4. Run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
```
npm start
```

# Production
Create the optimized version for production running:
```
yarn build
```

 > This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).