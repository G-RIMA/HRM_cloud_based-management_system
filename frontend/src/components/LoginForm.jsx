// LoginForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual backend URL

const LoginForm = () => {
  const [userType, setUserType] = useState('director');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const redirectToDirectorDashboard = () => {
    
    navigate('/director-dashboard');
  };

  const redirectToHRDashboard = () => {
    navigate('/hr-dashboard');
  };

  const redirectToEmployeeDashboard = () => {
    navigate('/employee-dashboard');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      switch (userType) {
        case 'director':
          await login('Director', userData);
          redirectToDirectorDashboard();
          break;
        case 'hr':
          await login('Hr', userData);
          redirectToHRDashboard();
          break;
        case 'employee':
          await login('Employee', userData);
          redirectToEmployeeDashboard();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (userType, userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/${userType.toLowerCase()}/login`, userData);
      const token = response.data.token; // Assuming the response contains the JWT token as "token"
      localStorage.setItem('token', token); 
      // Handle successful login, e.g., redirect to a dashboard page
    } catch (error) {
      console.error(error);
      // Handle login error, e.g., display an error message
    }
  };

  return (
    <form>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label>
          User Type:
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="director">Director</option>
            <option value="hr">HR</option>
            <option value="employee">Employee</option>
          </select>
        </label>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button type="button" onClick={handleLogin}>
          Log in
        </button>
      </div>
      <div>
        <p>Don't have an account?</p>
        <div style={{ marginTop: '1rem' }}>
          <Link to='/signup' className='Link' type="submit">Sign up</Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
