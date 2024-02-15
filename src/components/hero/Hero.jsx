import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import moment from 'moment'
import 'moment/locale/hu';
import { Switch } from 'antd';
import { useWeather } from '../../contexts/WeatherContext';
import { motion } from 'framer-motion'

export const Hero = () => {
    const date = new Date();
    const currentDate = moment(date).locale('hu').format('YYYY. MMMM DD.');
    const currentDayTime = moment(date).locale('hu').format('dddd, HH:mm')
    const [fahrenheit, setFahrenheit] = useState(false);
    const { weatherList, forecastList, getAllWeatherInfoFromSearch, getAllDailyForecastFromSearch } = useWeather();

    const handleSwitch = () => {
        setFahrenheit(!fahrenheit)
    };

    const handleSearch = (search) => {
        getAllDailyForecastFromSearch(search)
        getAllWeatherInfoFromSearch(search)
    }

    if (forecastList.length === 0 || weatherList === 0) {
        return <div className='hero__image'>
            <div className='hero__layer'></div>
            <motion.div className='hero__permission-denied'
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                variants={{
                    visible: { opacity: 1, scale: 1 },
                    hidden: { opacity: 0, scale: 0 }
                }}>
                <h2>Üdvözlöm!</h2>
                <p>Jelenleg nincs lekérhető adat:</p>
                <ul>
                    <li>Kérem, engedélyezze a helymeghatározást, hogy az oldal be tudja tölteni az időjárás adatokat.</li>
                    <li>Amennyiben Ön engedélyezte a helymeghatározást, és nem töltenek be az adatok, kérem frissítse az oldalt.</li>
                </ul>
            </motion.div>
        </div>;
    }
    return (
        <div className='hero-container'>
            <div className="hero__image">
                <div className="hero__layer"></div>
                <div className='hero__text'>
                    <motion.div className="hero__text-datas__container"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        variants={{
                            visible: { opacity: 1, scale: 1 },
                            hidden: { opacity: 0, scale: 0 }
                        }}>
                        <div className="hero__text-datas">
                            <div className="hero__degree">
                                <h1>
                                    {fahrenheit
                                        ? `${weatherList ? Math.round((weatherList.main.temp - 273.15) * 9 / 5 + 32) + " °F" : ""}`
                                        : `${weatherList ? Math.round(weatherList.main.temp - 273.15) + " °C" : ""}`
                                    }
                                </h1>
                            </div>
                            <div className="hero__data">
                                <p className='city'>{weatherList ? weatherList.name + ", " + weatherList.sys.country : ""}</p>
                                <p className='date'>{currentDate}</p>
                                <div className="hero__date">
                                    <p>{currentDayTime}</p>
                                </div>
                            </div>
                        </div>
                    <div className="hero__diagram">
                        <div className="hero__diagram-box">
                            <p>Hőérzet:
                                {fahrenheit
                                    ? ` ${weatherList ? Math.round((weatherList.main.feels_like - 273.15) * 9 / 5 + 32) + " °F" : ""}`
                                    : ` ${weatherList ? Math.round(weatherList.main.feels_like - 273.15) + " °C" : ""}`
                                }
                            </p>
                            <p>Páratartalom: {weatherList ? weatherList.main.humidity + "%" : ""}</p>
                        </div>
                        <div className="hero__line"></div>
                        <div className="hero__diagram-box">
                            <p>Min. hőmérséklet:
                                {fahrenheit
                                    ? ` ${weatherList ? Math.round((weatherList.main.temp_min - 273.15) * 9 / 5 + 32) + " °F" : ""}`
                                    : ` ${weatherList ? Math.round(weatherList.main.temp_min - 273.15) + " °C" : ""}`
                                }
                            </p>
                            <p>Max. hőmérséklet:
                                {fahrenheit
                                    ? ` ${weatherList ? Math.round((weatherList.main.temp_max - 273.15) * 9 / 5 + 32) + " °F" : ""}`
                                    : ` ${weatherList ? Math.round(weatherList.main.temp_max - 273.15) + " °C" : ""}`
                                }
                            </p>
                        </div>
                        <div className="hero__line"></div>
                        <div className="hero__diagram-box">
                            <p>Csapadék: {weatherList && weatherList.rain ? Math.round((weatherList.rain["1h"]) * 24) + " mm" : "0%"}</p>
                            <p>{weatherList ? "Szél: " + Math.round(weatherList.wind.speed * 3.6) + " km/óra" : ""}</p>
                        </div>
                        <div className="hero__line"></div>
                        <div className="hero__diagram-box">
                            <p>Napnyugta: {weatherList ? moment.unix(weatherList.sys.sunset).format('HH:mm') : ""}</p>
                            <p>Napkelte: {weatherList ? moment.unix(weatherList.sys.sunrise).format("HH:mm") : ""}</p>
                        </div>
                    </div>
                    </motion.div>
                    <motion.div className="hero__forecast"
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                     transition={{ duration: 0.6 }}
                     variants={{
                         visible: { opacity: 1, scale: 1 },
                         hidden: { opacity: 0, scale: 0 }
                     }}>
                        <h2>Egy napos előrejelzés 3 óránként.</h2>
                        <div className="hero__daily-forecast">
                            {forecastList.slice(0, 9).map((daily, index) => (
                                <div key={index}>
                                    <p>{moment(daily.dt_txt).format('ddd')}</p>
                                    <p>{moment(daily.dt_txt).format('HH:mm')}</p>
                                    <img src={`https://openweathermap.org/img/wn/${daily.weather[0].icon}.png`} alt={daily.weather[0].main} />
                                    <p className='hero__daily-degree'>
                                        {fahrenheit
                                            ? `${Math.round((daily.main.temp - 273.15) * 9 / 5 + 32) + " °F"}`
                                            : `${Math.round(daily.main.temp - 273.15) + " °C"}`
                                        }
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
                <motion.div className='hero__footer'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.1 }}
                    variants={{
                        visible: { opacity: 1, width: '80%' },
                        hidden: { opacity: 0, width: '50%' }
                    }}>
                    <div className="hero__footer-title">
                        <p>Adatok</p>
                    </div>
                    <div className="hero__footer-content">
                        <div className="hero__footer-box">
                            <p>Helymeghatározás</p>
                            <h2>{weatherList ? weatherList.name + ", " + weatherList.sys.country : "Helymeghatározás..."}</h2>
                        </div>
                        <div className="footer__line"></div>
                        <div className="hero__footer-box">
                            <p>Légnyomás</p>
                            <h2>{weatherList ? weatherList.main.pressure : ""}</h2>
                        </div>
                        <div className="footer__line"></div>
                        <div className="hero__footer-box">
                            <p>Egységváltás</p>
                            <Switch onClick={handleSwitch} checkedChildren="°C" unCheckedChildren="°F" />
                        </div>
                        <div className="footer__line"></div>
                        <div className="hero__footer-box">
                            <p>Készítette</p>
                            <h2>Török Bence</h2>
                        </div>
                        <div className="footer__line"></div>
                        <div className="hero__footer-box">
                            <div className="footer__search">
                                <div className='search-icon' ><CiSearch /></div>
                                <input type="search" placeholder="Keresés" name="search" id="search" onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch(e.target.value);
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
