// import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

const EmployeeDashboard = () => {
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
    console.error(error);
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
    console.error(error);
  }
  };

  const handleRecordLunchCheckIn = async () => {
    try {
      await api.post('/api/attendance/record-lunch-check-in');
      alert('Lunch check-in recorded successfully.');
    } catch (error) {
      console.error(error);
      alert('Error recording lunch check-in.');
    }
  };

  const handleRecordCheckOut = async () => {
    try {
      await api.post('/api/attendance/record-check-out');
      alert('Check-out recorded successfully.');
    } catch (error) {
      console.error(error);
      alert('Error recording check-out.');
    }
  };

  const handleLogout = () => {
    // Clear the JWT token from localStorage when the user logs out
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <button onClick={handleRecordCheckIn}>Record Check-In</button>
      <button onClick={handleRecordLunchCheckOut}>Record Lunch Check-Out</button>
      <button onClick={handleRecordLunchCheckIn}>Record Lunch Check-In</button>
      <button onClick={handleRecordCheckOut}>Record Check-Out</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default EmployeeDashboard;

