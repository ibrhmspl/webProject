import axios from "axios";

export const getuser = () => {
  let token = localStorage.getItem('token');
  return axios
  .get('http://127.0.0.1:8000/api/user',{
      headers: { Authorization: `Bearer ${token}` }
    })
  .then(function (response) {
    return response.data
    
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const register = ({name, email, password,key}) => {
  return axios.post('http://127.0.0.1:8000/api/auth/register', {
    name,
    email,
    password,
    key,
  });
};
 export const login = ({email, password}) => {
  return axios
    .post('http://127.0.0.1:8000/api/auth/login', {
      email,
      password,
    })
    .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        let token = response.data.token.access_token;
        localStorage.setItem('token', token);
        return response.data;
      
    });
};
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
const authService = {
  register,
  login,
  logout,
  getuser
};
export default authService;