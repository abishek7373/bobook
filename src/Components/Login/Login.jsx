import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;

    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const users = await response.json();
      const foundUser = users.find(user => user.email === email);

      if (!foundUser) {
        setError('User not found. Please check your email.');
        navigate('/Register'); 
        window.alert('Incorrect Username Redirecting to RegisterPage');
        return;
      }

      if (foundUser.password !== password) {
        setError('Incorrect password. Please try again.');
        return;
      }

      setError(''); 


      console.log('Login successful:', foundUser);
      window.alert('Successfully Logged In');
      navigate('/'); 

    } catch (error) {
      setError('Error fetching user data');
    }
  };

  return (
    <div style={styles.container}>
      <center>
      <form style={styles.form}>
      <center><h1 style={{fontFamily:'sans-serif'}}>Login</h1></center>
        <label style={styles.label}>
          <input
            type="email"
            name="email"
            value={loginData.email}
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
            value={loginData.password}
            onChange={handleChange}
            style={{...styles.input , textAlign: 'center' }}
            placeholder='Passsword'
          />
        </label>
        <br />
        <button onClick={handleLogin} style={styles.button}>
          Login
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
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    paddingRight: '40px',
    paddingLeft :'20px',
    paddingTop :'20px',
    paddingBottom :'20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'white',
    fontFamily:'san-serif',
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

export default Login;
