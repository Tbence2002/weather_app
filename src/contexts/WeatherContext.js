import { createContext, useContext, useReducer, useEffect } from "react";
import { weatherReducer } from "../reducers/weatherReducer"; 
import axios from "axios";

const initialState = {
    weatherList: [],
    forecastList: [],
    country: [],
    userLocation: {},

}

const WeatherContext = createContext(initialState);

export const WeatherProvider = ({ children }) => {
    const [state, dispatch] = useReducer(weatherReducer, initialState);

    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type:"GET_LOCATION",
                    payload: {
                        location: position.coords
                    }
                })
            },
            (error) => {
                console.error("Hiba történt a helymeghatározás során: ", error);
                console.log(error.message);
            }
        )
    }

    useEffect(() => {
        getCurrentPosition();
    }, []);

    useEffect(() => {
        if(state.userLocation && state.userLocation.latitude && state.userLocation.longitude) {
              
        getAllWeatherInfoFromPosition(state.userLocation.latitude, state.userLocation.longitude);
        getAllDailyForecastFromPosition(state.userLocation.latitude, state.userLocation.longitude);

        }
    }, [state.userLocation]);

    const getAllWeatherInfoFromPosition = (latitude, longitude) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response) => {
                dispatch({
                    type:"GET_WEATHER",
                    payload: {
                        weather: response.data
                    }
                })
            })
            .catch((error) => {
                console.error("Hiba történt a lekérés során:", error);
                console.log(error.message);
            });
    }

    const getAllDailyForecastFromPosition = (latitude, longitude) => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response) => {
                dispatch({
                    type:"GET_FORECAST",
                    payload: {
                        forecast: response.data.list
                    }
                })
            })
            .catch((error) => {
                console.error("Hiba történt a lekérés során:", error);
                console.log(error.message);
            });
    }

    
      const getAllWeatherInfoFromSearch = (search) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response) => {
              dispatch({
                type: "GET_WEATHER",
                payload: {
                    weather: response.data
                }
              })
            })
            .catch((error) => {
              console.error("Hiba történt a városok lekérése során:", error);
            });
      }
    
      const getAllDailyForecastFromSearch = (search) => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response) => {
              dispatch({
                type: "GET_FORECAST",
                payload: {
                    forecast:response.data.list
                }
              })
            })
            .catch((error) => {
              console.error("Hiba történt a városok lekérése során:", error);
            });
      }

    const value = {
        weatherList: state.weatherList,
        forecastList: state.forecastList,
        userLocation: state.userLocation,
        country: state.country,
        getAllWeatherInfoFromSearch,
        getAllDailyForecastFromSearch
    }

    return (
        <WeatherContext.Provider value={value}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeather = () => {
    const context = useContext(WeatherContext);
    return context;
}