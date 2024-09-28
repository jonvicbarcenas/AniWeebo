import axios from 'axios';

// URL of the website to ping
const url = 'https://jvbarcenas.tech/';

// Ping the website every 15 minutes (15 * 60 * 1000 milliseconds)
const interval = 15 * 60 * 1000;

// Function to ping the website
const pingWebsite = async () => {
  try {
    const response = await axios.get(url, {
      timeout: 5000, // Set a timeout for the request (5 seconds)
    });
    console.log(`Pinged ${url} - Status: ${response.status}`);
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(`Ping failed with status ${error.response.status}`);
    } else if (error.request) {
      // No response received from the server
      console.error('No response from the server:', error.message);
    } else {
      // Error during request setup
      console.error('Error setting up the ping request:', error.message);
    }
  }
};

// Ping immediately and then at regular intervals
pingWebsite();
setInterval(pingWebsite, interval);

