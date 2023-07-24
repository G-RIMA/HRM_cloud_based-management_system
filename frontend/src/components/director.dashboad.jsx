import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

const DirectorDashboard = ({ UserId }) => {
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

  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    // Fetch attendance records for the logged-in user
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get(`/api/user/${UserId}/attendance`);
        setAttendanceRecords(response.data.attendanceRecords);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    fetchAttendanceRecords();
  }, [UserId]);

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <div>
      <h2>Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Total Working Hours</th>
            <th>Overtime</th>
            <th>Late Arrivals</th>
            <th>Early Departures</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.check_in}</td>
              <td>{record.check_out}</td>
              <td>{record.total_working_hours}</td>
              <td>{record.overtime}</td>
              <td>{record.late_arrivals}</td>
              <td>{record.early_departures}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <button onClick={handleRecordCheckIn}>Record Check-In</button>
      <button onClick={handleRecordLunchCheckOut}>Record Lunch Check-Out</button>
      <button onClick={handleRecordLunchCheckIn}>Record Lunch Check-In</button>
      <button onClick={handleRecordCheckOut}>Record Check-Out</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DirectorDashboard;

