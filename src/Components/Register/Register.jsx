import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      console.log('User registered successfully:', userData);
      setError('');
      window.alert("Redircting to Login Page")
      navigate('/Login');


    } catch (error) {
      setError('Error registering user');
      console.error('Error registering user:', error);
    }

  };

  return (
    <div style={styles.container}>
      <center>
        <form style={styles.form} onSubmit={handleSubmit}>
          <h1 style={{fontFamily:'sans-serif'}}>Register</h1>
          <label style={styles.label}>
            
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              style={{...styles.input , textAlign: 'center' }}
              placeholder='Email'

            />
          </label>
          <br />
          <label style={styles.label}>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              style={{...styles.input , textAlign: 'center' }}
              placeholder='Passsword'

            />
          </label>
          <label style={styles.label}>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              style={{...styles.input , textAlign: 'center' , marginTop:'18px'}}
              placeholder='Conform Password'

            />
          </label>
          <br />
          <button type="submit" style={styles.button}>
            Register
          </button>
          <br />
          {error && <span style={styles.error}>{error}</span>}
        </form>
      </center>
    </div>
  );
};

const styles = {
  container: {
    marginTop :'160px',
    paddingBottom:'200px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    paddingRight: '40px',
    paddingLeft: '20px',
    paddingTop: '20px',
    paddingBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'white',
    fontFamily: 'san-serif',
    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset'

  },
  label: {
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '14px',
    width: '100%',
  },
 
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default Register;
