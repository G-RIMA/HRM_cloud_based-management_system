import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Import useParams from react-router-dom
const API_BASE_URL = 'http://localhost:3000';

const RecordsDisplay = () => {
  const { UserId } = useParams(); // Use the useParams hook to get the UserId from the URL
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
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
      <h1>Attendance Records for User</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserId</th>
            {/* Add other columns as needed */}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.UserId}</td>
              {/* Add other cells with corresponding data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsDisplay;
