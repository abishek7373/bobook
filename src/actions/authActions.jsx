import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/users', userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL', payload: error.message });
  }
};

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/users');
    const users = response.data;
    const foundUser = users.find(user => user.email === loginData.email);

    if (!foundUser) {
      throw new Error('User not found');
    }

    if (foundUser.password !== loginData.password) {
      throw new Error('Incorrect password');
    }

    console.log('Login successful');
    dispatch({ type: 'LOGIN_SUCCESS', payload: foundUser });
  } catch (error) {
    console.error('Login failed:', error.message);
    dispatch({ type: 'LOGIN_FAIL', payload: error.message });
  }
};
