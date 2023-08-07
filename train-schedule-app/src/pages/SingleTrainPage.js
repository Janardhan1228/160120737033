// SingleTrainPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainCard from '../components/TrainCard';
import '../styles.css';

const SingleTrainPage = ({ match }) => {
  const { trainNumber } = match.params;

  // State to store the details of the single train
  const [train, setTrain] = useState(null);

  // Fetch the details of the single train from the API
  useEffect(() => {
    axios.get(`http://20.244.56.144:80/train/trains/${trainNumber}`)
      .then((response) => {
        setTrain(response.data);
      })
      .catch((error) => {
        console.error('Error fetching train data:', error);
      });
  }, [trainNumber]);

  return (
    <div className="single-train-page">
      {train ? <TrainCard train={train} /> : <p>Loading...</p>}
    </div>
  );
};

export default SingleTrainPage;
