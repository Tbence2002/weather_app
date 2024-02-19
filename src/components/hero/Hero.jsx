import { HeroDatas } from "./HeroDatas"
import { useWeather } from '../../contexts/WeatherContext';
import { motion } from 'framer-motion'

export const Hero = () => {
    const { forecastList } = useWeather();

    if (forecastList.length === 0) {
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
            {forecastList[0].weather[0].main === "Clear" ?
                <div className="hero__image">
                    <div className="hero__image__clear-sky">
                        <HeroDatas />
                    </div>
                </div>
                :
                ""
            }
            {forecastList[0].weather[0].main === "Clouds" ?
                <div className="hero__image">
                    <HeroDatas />
                </div>
                :
                ""
            }
            {forecastList[0].weather[0].main === "Rain" ?
                <div className="hero__image">
                    <div className="hero__image__rain">
                        <HeroDatas />
                    </div>
                </div>
                :
                ""
            }
             {forecastList[0].weather[0].main === "Snow" ?
                <div className="hero__image">
                    <div className="hero__image__snow">
                        <HeroDatas />
                    </div>
                </div>
                :
                ""
            }
        </div>
    )
}
