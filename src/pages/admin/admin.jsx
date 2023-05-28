import { React, useState, useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthProvider';
import { AddWeatherForm } from './components/addWeatherForm';
import { WeatherService } from '../../API/WeatherService';
import styles from './styles.module.css';
import { useEffect } from 'react';

export const Admin = () => {
  const [weathers, setWeathers] = useState([]);
  const { Auth } = useContext(AuthContext);

  useEffect(() => {
    getAllWeathers();
  }, []);

  const getAllWeathers = async () => {
    let data = await WeatherService.search({});
    data.forEach((value) => {
      value.date = new Date(value.date);
    });
    setWeathers(data);
  }

  const deleteWeather = async (id) => {
    const index = weathers.findIndex(((value) => value._id === id));
    await WeatherService.delete(weathers[index]._id, Auth.access_token);
    setWeathers([...weathers.slice(0, index), ...weathers.slice(index+1)]);
  }

  return (
    <Container className={styles.Admin}>
      <AddWeatherForm className={styles.WeatherForm} weathersInfo={[weathers, setWeathers]}/>
      <Container className={styles.WeatherList}>
        <Table bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>id</th>
              <th>region</th>
              <th>city</th>
              <th>temp</th>
              <th>weather</th>
              <th>wind</th>
              <th>humidity</th>
              <th>precip</th>
              <th>visibility</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {weathers.map(
              weather => 
              <tr>
                <td><button className={styles.DeleteBtn} type="button" onClick={async () => await deleteWeather(weather._id)}></button></td>
                <td>{weather._id}</td>
                <td>{weather.region}</td>
                <td>{weather.city}</td>
                <td>{weather.temperature}</td>
                <td>{weather.weather}</td>
                <td>{weather.wind}</td>
                <td>{weather.humidity}</td>
                <td>{weather.precipitation}</td>
                <td>{weather.visibility}</td>
                <td>{weather.date.toDateString()}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}