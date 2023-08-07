// AllTrainsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainCard from '../components/TrainCard';
import { getAllTrains } from '../api';
import '../styles.css';

const AllTrainsPage = () => {
  // State to store the list of trains
  const [trains, setTrains] = useState([]);

  // Fetch all trains data from the API
  useEffect(() => {
    const fetchTrains = async () => {
      try {
        // Make API call to get all trains
        const accessToken = ''; // Get the access token from your state or local storage
        const allTrains = await getAllTrains(accessToken);

        // Filter out trains departing in the next 30 minutes
        const currentTime = new Date();
        const filteredTrains = allTrains.filter((train) => {
          const departureTime = new Date(train.departureTime.Hours, train.departureTime.Minutes);
          const timeDifference = (departureTime - currentTime) / 60000; // Convert milliseconds to minutes
          return timeDifference > 30;
        });

        // Sort remaining trains based on specified order
        const sortedTrains = filteredTrains.sort((a, b) => {
          // Sort by ascending price
          if (a.price.sleeper !== b.price.sleeper) {
            return a.price.sleeper - b.price.sleeper;
          }

          // Sort by descending tickets
          if (a.seatsAvailable.sleeper !== b.seatsAvailable.sleeper) {
            return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
          }

          // Sort by descending departure time (after considering delays in minutes)
          const aDepartureTimeWithDelay = new Date(a.departureTime.Hours, a.departureTime.Minutes + a.delayedBy);
          const bDepartureTimeWithDelay = new Date(b.departureTime.Hours, b.departureTime.Minutes + b.delayedBy);
          return bDepartureTimeWithDelay - aDepartureTimeWithDelay;
        });

        setTrains(sortedTrains);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div className="all-trains-page">
      {/* Display the list of trains here */}
      {trains.map((train) => (
        <TrainCard key={train.trainNumber} train={train} />
      ))}
    </div>
  );
};

export default AllTrainsPage;
