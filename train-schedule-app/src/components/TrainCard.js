// TrainCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const TrainCard = ({ train }) => {
  return (
    <div className="train-card">
      <h2>{train.trainName}</h2>
      <p>Train Number: {train.trainNumber}</p>
      <p>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}</p>
      <p>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</p>
      <p>Seats Available (AC): {train.seatsAvailable.AC}</p>
      <p>Price (Sleeper): {train.price.sleeper}</p>
      <p>Price (AC): {train.price.AC}</p>
      <p>Delayed By: {train.delayedBy} minutes</p>
      <Link to={`/trains/${train.trainNumber}`}>View Details</Link>
    </div>
  );
};

export default TrainCard;
