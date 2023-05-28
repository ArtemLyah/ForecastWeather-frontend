import React from 'react';
import { Container} from 'react-bootstrap';
import styles from './styles/weatherInfo.module.css'

export const WeatherInfo = (props) => {
  const {
    region,
    city,
    temperature,
    weather,
    wind,
    humidity,
    precipitation,
    visibility,
    date,
  } = props.weather;
  return ( 
    <Container className={styles.weatherInfo}>
      <Container className={styles.firstBlock}>
        <p>Region: {region}, {city}</p>
        <p>Temperature: {temperature}°C</p>
        <p>Weather: {weather}</p>
        <p>Date: {new Date(date).toDateString()}</p>
      </Container>
      <Container className={styles.secondBlock}>
        <p>Wind: {wind} km/h</p>
        <p>Humidity: {humidity}%</p>
        <p>Precipitation: {precipitation}mm</p>
        <p>Visibility: {visibility}km</p>
      </Container>
    </Container>
  );
}