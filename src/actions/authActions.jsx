import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/create_user/', userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL', payload: error.message });
  }
};

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/read_users/');
    const users = response.data;
    const foundUser = users.find(user => user.email === loginData.email);

    if (!foundUser) {
      throw new Error('User not found');
    }

    if (foundUser.password !== loginData.password) {
      throw new Error('Incorrect password');
    }

    // Store user data in local storage
    localStorage.setItem('user', JSON.stringify(foundUser));

    console.log('Login successful');
    dispatch({ type: 'LOGIN_SUCCESS', payload: foundUser });
  } catch (error) {
    console.error('Login failed:', error.message);
    dispatch({ type: 'LOGIN_FAIL', payload: error.message });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('user');
  dispatch({ type: 'LOGOUT' });
};

export const UPDATE_USER = 'UPDATE_USER';

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});