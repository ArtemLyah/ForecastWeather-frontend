import { React, useState, useContext } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthProvider';
import { WeatherService } from '../../../API/WeatherService';
import { getCurrentDate, setCurrentDate } from '../../../utils/mics';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './styles/addWeatherForm.module.css';

export const AddWeatherForm = ({className, weathersInfo}) => {
  const [weathers, setWeathers] = weathersInfo;
  const [newWeather, setNewWeather] = useState({
    date: getCurrentDate()
  });
  const [validated, setValidation] =  useState(false);
  const { Auth } = useContext(AuthContext);

  const handleSubmit = (event) => {
    if (
      newWeather.region &&
      newWeather.city &&
      newWeather.weather &&
      newWeather.temperature &&
      newWeather.wind &&
      newWeather.humidity &&
      newWeather.precipitation &&
      newWeather.visibility && 
      newWeather.date
    ) {
      setValidation(true)
      addWeather();
    }
    event.preventDefault();
  };

  const addWeather = async () => {
    try {
      const responseWeather = await WeatherService.create(newWeather, Auth.access_token);
      responseWeather.date = new Date(responseWeather.date);
      setWeathers([...weathers, responseWeather]);
    }
    catch (err) {
      if (!err?.response) {
        console.log(err);
      }
      else if (err.response.status === 400 || err.response.status === 401) {
        return;
      }
    }
  }

  return ( 
    <Form className={className} validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Form.Group as={Col} controlId="validationRegion">
          <Form.Label>Region</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Region" 
            value={newWeather.region}
            onChange={(event => setNewWeather({...newWeather, region: event.target.value}))}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="validationCity">
          <Form.Label>City</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="City"
            value={newWeather.city}
            onChange={(event => setNewWeather({...newWeather, city: event.target.value}))}
            required
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="validationWeather">
          <Form.Label>Weather</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Weather"
            value={newWeather.weather}
            onChange={(event => setNewWeather({...newWeather, weather: event.target.value}))}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="validationTemperature">
          <Form.Label>Temperature</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="°C"
            value={newWeather.temperature}
            onChange={(event => setNewWeather({...newWeather, temperature: Number.parseFloat(event.target.value)}))}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="validationWind">
          <Form.Label>Wind</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="km/h"
            value={newWeather.wind}
            onChange={(event => setNewWeather({...newWeather, wind: Number.parseFloat(event.target.value)}))}
            required
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="validationHumidity">
          <Form.Label>Humidity</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="%"
            value={newWeather.humidity}
            onChange={(event => setNewWeather({...newWeather, humidity: Number.parseFloat(event.target.value)}))}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="validationPrecipitation">
          <Form.Label>Precipitation</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="mm"
            value={newWeather.precipitation}
            onChange={(event => setNewWeather({...newWeather, precipitation: Number.parseFloat(event.target.value)}))}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="validationVisibility">
          <Form.Label>Visibility</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="km"
            value={newWeather.visibility}
            onChange={(event => setNewWeather({...newWeather, visibility: Number.parseFloat(event.target.value)}))}
            required
          />
        </Form.Group>
      </Row>
      <Calendar 
        className={styles.Calendar} 
        onClickDay={((value, _) => setNewWeather({...newWeather, date: setCurrentDate(value)}))}
        calendarType="ISO 8601"
      />
      <Button type="submit" onClick={handleSubmit}>Add forecast</Button>
    </Form>
  );
}