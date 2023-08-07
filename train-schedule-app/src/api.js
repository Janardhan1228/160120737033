// api.js
import axios from 'axios';

// Function to register your company with the John Doe Railway Server
export const registerCompany = async (companyData) => {
  try {
    const response = await axios.post('http://20.244.56.144/train/register', companyData);
    return response.data;
  } catch (error) {
    console.error('Error registering company:', error);
    throw error;
  }
};

// Function to obtain the authorization token for your company
export const getAuthorizationToken = async (companyData) => {
  try {
    const response = await axios.post('http://20.244.56.144/train/auth', companyData);
    return response.data;
  } catch (error) {
    console.error('Error obtaining authorization token:', error);
    throw error;
  }
};

// Function to get all trains data from the John Doe Railway Server
export const getAllTrains = async (accessToken) => {
  try {
    const response = await axios.get('http://20.244.56.144:80/train/trains', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all trains:', error);
    throw error;
  }
};

// Function to get details of a specific train from the John Doe Railway Server
export const getSingleTrain = async (accessToken, trainNumber) => {
  try {
    const response = await axios.get(`http://20.244.56.144:80/train/trains/${trainNumber}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching single train:', error);
    throw error;
  }
};
