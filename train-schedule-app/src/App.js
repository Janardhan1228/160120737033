// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { registerCompany, getAuthorizationToken } from './api';
import AllTrainsPage from './pages/AllTrainsPage';
import SingleTrainPage from './pages/SingleTrainPage';
import './styles.css';

const App = () => {
  // State to store the access token
  const [accessToken, setAccessToken] = useState('');

  // Function to handle company registration and token retrieval
  useEffect(() => {
    const registerAndAuthorizeCompany = async () => {
      try {
        const companyData = {
          companyName: 'Train Central',
          ownerName: 'Ram',
          rollNo: '1',
          ownerEmail: 'ram@abc.edu',
          accessCode: 'FKDLjg',
        };

        // Register the company and get the client ID and client secret
        const { clientID, clientSecret } = await registerCompany(companyData);

        // Obtain the authorization token
        const authorizationData = {
          companyName: 'Train Central',
          clientID,
          ownerName: 'Ram',
          ownerEmail: 'ram@abc.edu',
          rollNo: '1',
          clientSecret,
        };

        const { accessToken } = await getAuthorizationToken(authorizationData);

        // Save the access token to state or local storage
        setAccessToken(accessToken);
      } catch (error) {
        console.error('Error registering company or obtaining authorization token:', error);
      }
    };

    // Call the registration and authorization function
    registerAndAuthorizeCompany();
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Route to display all trains */}
          <Route exact path="/" component={AllTrainsPage} />

          {/* Route to display a single train */}
          <Route path="/trains/:trainNumber" component={SingleTrainPage} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
