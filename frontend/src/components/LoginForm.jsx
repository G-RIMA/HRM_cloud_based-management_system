import React, { useState } from 'react';
import "../css/LoginForm.css";
import { Link } from 'react-router-dom';


const LoginForm = () => {
    const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });

    
    const[errors, setErrors] = useState({})

    const handleSubmit = (e) => {
      e.preventDefault();
  };

    const handleInput = (e) => {
      setValues(prev => ({...prev, [e.target.name]: [e.target.value]}));

    }
    
  
    return (
    <div> 
        <form 
    class='form-group' 
    onSubmit={handleSubmit}>
      <label>First Name:</label>
      <input
        type="text"
        name="firstName"
        onChange={handleInput}
        required
      />
      
      <label>Last Name:</label>
      <input
        type="text"
        name="lastName"
        onChange={handleInput}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        onChange={handleInput}
        required
      /> 

      <label>Password:</label>
      <input
        type="password"
        name="password"
        onChange={handleInput}
        required
      />

     
      
      <div style={{ marginTop: '1rem' }}>
        <button type="submit">Log In</button>
      </div>
      <p>Dont have an account</p>
      <div style={{ marginTop: '1rem' }}>
        <Link to='/signup' class='Link' type="submit">Sign Up</Link>
    </div>
    </form>
    
   </div>
  );
};

export default LoginForm;