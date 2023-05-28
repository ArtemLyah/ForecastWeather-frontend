import React from 'react';
import styles from './styles.module.css'

export const Home = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.HomeText}>
        <p>Welcome to the forecast weather!<br/>
          This website was made for the course work so forecasts there are not truthful :)<br/>
          The project describes how a student can create a course work for 6 days 
          but with some knowledge of programming. 
        </p>
        <p>
          This project includes work with TypeScript and JavaScript. <br/>
          The frameworks which are used are Nest and React. <br/>
          The architecture of the project is divided to frontend and backend which are interacting with each other.<br/>
          Also there was used NoSql database MongoDB.
        </p>
        <p>I hope you will enjoy the website and find something interesting there.</p>
        <p>Good luck!</p>
      </div>
      <img className={styles.HomeImage} src="https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/a1d7ee4/2147483647/resize/800x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Ff0%2F4c%2F02b1f4314a3283f556a8903d6e5b%2Fweather-forecast-concept.jpg" alt="Weather" />
    </div>
  );
}