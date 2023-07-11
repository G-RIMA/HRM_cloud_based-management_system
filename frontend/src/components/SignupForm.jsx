import React, { useState } from 'react';
import "../css/SignupForm.css";
import { Link } from 'react-router-dom';


const SignupForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [organization, setOrganization] = useState('');
    const [hrType, setHrType] = useState('');
    const [organizationForms, setOrganizationForms] = useState([]);


    const handleSubmit = async (e) => {
      
  };

    const handleAddOrganization = () => {
        setOrganizationForms((prevForms) => [{ id: Date.now() }, ...prevForms]);
      };
    
  
    return (
    <div>
        <form 
    class='form-group' 
    onSubmit={handleSubmit}>
      <label>First Name:</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      
      <label>Last Name:</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label>Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="">Select Role</option>
        <option value="HR">HR</option>
        <option value="Director">Director</option>
      </select>

      {role === 'Director' && (
        <>
          <label>Organization:</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
          <label>Organisation type:</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
          <label>Organisation address:</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
          <label>Organisation contact:</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
          <label>Organisation email:</label>
          <input
            type="email"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
        </>
        
      )}
      
      {role === 'HR' && (
      <>
        <label> Human resourse type:</label>
        <select value={hrType} onChange={(e) => setHrType(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="HR consultant">HR Consultant</option>
            <option value="HR manager">HR Manager</option>
        </select>
         {hrType === 'HR manager' && (
          <>
          <label>Organization:</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
        </>
        )} 
        
        {hrType === 'HR consultant' && (
        <>
          <label>Organization Name:</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
          <label>Organisation type:</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
          <label>Organisation address:</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
          <label>Organisation contact:</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
          <label>Organisation email:</label>
          <input
            type="email"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
          <div style={{ marginTop: '1rem' }}>
            <button type="button" onClick={handleAddOrganization} >
            Add Organisation</button>
            {organizationForms.map((form) => (
                <div key={form.id}>
                  <label>Organization Name:</label>
                  <input type="text" 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)} 
                  required />
                  <label>Organization type:</label>
                  <input type="text" 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)} required />
                  <label>Address:</label>
                  <input type="text" 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)} required />
                  <label>Organization contact:</label>
                  <input type="text" 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)} required />
                  <label>Organisation Email:</label>
                  <input type="email" 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  required />

                </div>
            ))}
          </div>
        </>
        )}
      </>
      )}
      
      <div style={{ marginTop: '1rem' }}>
        <button type="submit">Signup</button>
      </div>
      
      <p>Already have an account</p>
      <div style={{ marginTop: '1rem' }}>
        <Link to='/login' class='Link' type="submit">Log In</Link>
      </div>

    </form>
   </div>
  );
};

export default SignupForm;
