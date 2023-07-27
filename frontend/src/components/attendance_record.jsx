import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance_Record = () => {
    const API_BASE_URL = 'http://localhost:3000';

    const [records, setRecords] = useState([]);
    const [UserId] = useState([]);

    useEffect(() => {
        fetchRecords();

        const interval = setInterval(() => {
            fetchRecords();

        }, 20000);

        return () => clearInterval(interval);
    }, [UserId]);

    const fetchRecords = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/attendance/`);
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching records:" , error)
            
        }
    }

    return (
        <div>
        <h2>Attendance Records</h2>
        <table>
        <thead>
          <tr>
            <th>Id</th>
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
              <td>{record.id}</td>
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
    );
};

export default Attendance_Record;