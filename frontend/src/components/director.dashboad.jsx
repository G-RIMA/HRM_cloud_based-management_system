import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import axios from 'axios';

const DirectorDashboard = () => {
  const history = useNavigate();

  const handleRecordCheckIn = async () => {
    try {
      await api.post('/api/attendance/record-check-in')
      .then(response => {
        // Process the response
        return response.data;
      })
      .then(data => {
        // Process the data
        console.log(data);
      });
    alert('Check-in recorded successfully.');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error;
      console.error(errorMessage); // Log the error
      alert(errorMessage); // Display the error message
    } else {
      console.error("Something went wrong while recording the check-in.");
      alert("Something went wrong while recording the check-in.");
    }
  }
  };

  const handleRecordLunchCheckOut = async () => {
    try {
      await api.post('/api/attendance/record-lunch-check-out')
      .then(response => {
        // Process the response
        return response.data;
      })
      .then(data => {
        // Process the data
        console.log(data);
      });
    alert('Lunch Check-out recorded successfully.');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error;
      console.error(errorMessage); // Log the error
      alert(errorMessage); // Display the error message
    } else {
      console.error("Something went wrong while recording the lunch check-out.");
      alert("Something went wrong while recording the lunch check_out.");
    }
  }
  };

  const handleRecordLunchCheckIn = async () => {
    try {
      await api.post('/api/attendance/record-lunch-check-in')
      .then(response => {
        // Process the response
        return response.data;
      })
      .then(data => {
        // Process the data
        console.log(data);
      });
    alert('Lunch Check-in recorded successfully.');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error;
      console.error(errorMessage); // Log the error
      alert(errorMessage); // Display the error message
    } else {
      console.error("Something went wrong while recording the lunch check-in.");
      alert("Something went wrong while recording the lunch check_in.");
    }
  }
  };

  const handleRecordCheckOut = async () => {
    try {
      await api.post('/api/attendance/record-check-out')
      .then(response => {
        // Process the response
        return response.data;
      })
      .then(data => {
        // Process the data
        console.log(data);
      });
    alert('Check-out recorded successfully.');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error;
      console.error(errorMessage); // Log the error
      alert(errorMessage); // Display the error message
    } else {
      console.error("Something went wrong while recording the check-out.");
      alert("Something went wrong while recording the check_out.");
    }
  }
  };

  const handleLogout = () => {
    // Clear the JWT token from localStorage when the user logs out
    localStorage.removeItem('token');
    history.push('/login');
  };


  //fetch attendance records for the use
  // Import useParams from react-router-dom
  const API_BASE_URL = 'http://localhost:3000';
  
  
   // Use the useParams hook to get the UserId from the URL
  const [records, setRecords] = useState([]);
  const [UserId] = useState([]);

  useEffect(() => {
    fetchRecords();

    const interval = setInterval(() => {
      fetchRecords();
    }, 20000); // Update every 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [UserId]); // Fetch records whenever UserId changes

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/attendance/${UserId}`);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };
  

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <div>
        <h2>Dashboard</h2>
      </div>
      <div>
        <button onClick={handleRecordCheckIn}>Record Check-In</button>
        <button onClick={handleRecordLunchCheckOut}>Record Lunch Check-Out</button>
        <button onClick={handleRecordLunchCheckIn}>Record Lunch Check-In</button>
        <button onClick={handleRecordCheckOut}>Record Check-Out</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <h2>Attendance Records</h2>
        <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Lunch Check Out</th>
            <th>Lunch Check In</th>
            <th>Check Out</th>

            {/* Add other columns as needed */}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              
              <td>{record.date}</td>
              <td>{record.check_in}</td>
              <td>{record.lunch_check_in}</td>
              <td>{record.lunch_check_out}</td>
              <td>{record.check_out}</td>
              {/* Add other cells with corresponding data */}
            </tr>
          ))}
        </tbody>
      </table>
        

      </div>
      
    </div>
  );
};

export default DirectorDashboard;

