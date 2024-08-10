import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const register = (data) => axios.post(`${API_URL}/register`, data);

const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data.token;
};

const authService = {
  register,
  login,
};

export default authService;
