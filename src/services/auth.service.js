import axios from "axios";

const login = (values) => {
  return axios
    .post(`${process.env.REACT_APP_BASEURL}/api/login`, {
      ...values,
    })
    .then((response) => {
      const { token } = response.data;
      if (token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log("ini response", response.data);
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default { login, logout, getCurrentUser };
