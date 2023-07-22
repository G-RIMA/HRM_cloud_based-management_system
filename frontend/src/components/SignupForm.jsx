import React, { useState } from 'react';
import "../css/SignupForm.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const API_BASE_URL = 'http://localhost:3000';

const SignUpForm = () => {
  const [userType, setUserType] = useState('director');
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    hr_type: '',
    wage: '',
    org_name: '',
    job_title: '',
    dep_name: '',
  });

  const navigate = useNavigate();


  const redirectToSignUp = () => {
    navigate('/login');
  };
  //const[errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleSignUp = async () => {
    try {
      switch(userType){
        case 'director':
          await signup('Director', userData);
          redirectToSignUp();
          break;
        case 'hr':
          await signup('Hr', userData);
          redirectToSignUp();
          break;
        case 'employee':
          await signup('Employee', userData);
          redirectToSignUp()
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  const signup = async(userType, userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/${userType.toLowerCase()}/signup`, userData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
    
  
    return ( 
        <form>
          <div>
            <label>
              First Name:
              <input type="text" name="first_name" value={userData.first_name} onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input type="text" name="last_name" value={userData.last_name} onChange={handleInputChange} />
            </label>
          </div>
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
                HR Type:
                <input type="text" name="hr_type" value={userData.hr_type} onChange={handleInputChange} />
              </label>
            </div>
            <div>
              <label>
                Wage:
                <input type="text" name="wage" value={userData.wage} onChange={handleInputChange} />
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
          <div style={{ marginTop: '1rem' }} >
          <button type="button" onClick={handleSignUp}>
            Sign up
          </button>
          </div>
          <div>
            <p>Have an account?</p>
            <div style={{ marginTop: '1rem' }}>
              <Link to='/login' className='Link' type="submit">Log in</Link>
            </div>
          </div>
        </form>
  );
    
};

export default SignUpForm;