import React from 'react';
import { useState, useEffect } from 'react';
import {Form, Button, Carousel } from 'react-bootstrap';
import { WeatherInfo } from './components/weatherInfo';
import Calendar from 'react-calendar';
import styles from './styles.module.css';
import { WeatherService } from '../../API/WeatherService';
import { setCurrentDate } from '../../utils/mics';

export const Forecast = () => {
  const [searchWeatherData, setSearchWeatherData] = useState({});
  const [weathers, setWeathers] = useState([]);
  const [isSelectedDate, setIsSelectedDate] = useState(null);

  const searchWeathers = async () => {
    const data = await WeatherService.search(searchWeatherData)
    setWeathers(data);
  }

  const setDate = (value, event) => {
    if (isSelectedDate === event.currentTarget) {
      event.currentTarget.className = "react-calendar__tile react-calendar__month-view__days__day";
      setSearchWeatherData({ ...searchWeatherData, date: null });
      setIsSelectedDate(null);
    }
    else {
      setSearchWeatherData({ ...searchWeatherData, date: setCurrentDate(value) });
      setIsSelectedDate(event.currentTarget);
    }
  } 

  useEffect(() => {
    searchWeathers();
  }, []);

  return (
    <div className={styles.Forecast}>
      <Form className={styles.Search}>
        <Form.Control 
          className={styles.SearchElement}
          type="text" 
          placeholder="Search region"
          onChange={(event) => setSearchWeatherData({ ...searchWeatherData, region: event.target.value })}
        />
        <Form.Control 
          className={styles.SearchElement}
          type="text" 
          placeholder="Search city"
          onChange={(event) => setSearchWeatherData({ ...searchWeatherData, city: event.target.value })}
        />
        <Button 
          className={styles.SearchElement} 
          style={{width: '100%'}} 
          type="button"
          onClick={searchWeathers}>
            Search
        </Button>
        <Calendar 
          className={styles.Calendar} 
          onClickDay={(value, event) => (setDate(value, event))}
          calendarType="ISO 8601"
        />
      </Form>
      <Carousel className={styles.Weathers} slide={false} variant="dark" interval={10000} pause="hover">
        {
          weathers.length !== 0 ? 
          weathers.map(weather => 
            <Carousel.Item>
              <WeatherInfo weather={weather}/>
            </Carousel.Item>
          )
          : <Carousel.Item>
              <p style={{textAlign: "center"}}>No weather was found</p>
            </Carousel.Item>
        }
      </Carousel>
    </div>
  );
}