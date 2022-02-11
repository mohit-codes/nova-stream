import axios from "axios";
import { BASE_URL } from "../utils/utility";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/";
import { useContext } from "react";

export const useAuth = (setLoading) => {
  const { user, setUser, setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  async function loginWithUserCredentials(email, password) {
    setLoading(true);
    const { data } = await axios.post(`${BASE_URL}/user/login`, {
      email: email,
      password: password,
    });
    if (data.success) {
      setUser(data.user);
      setToken(data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/", { replace: true });
    }
    setLoading(false);
    return [data.success, data.message];
  }
  async function signupWithUserCredentials({ name, email, password }) {
    setLoading(true);
    const { data } = await axios.post(`${BASE_URL}/user/signup`, {
      name: name,
      email: email,
      password: password,
    });
    if (data.success) {
      setUser(data.user);
      setToken(data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/", { replace: true });
    }
    setLoading(false);
    return [data.success, data.message];
  }

  function emailValidate(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  }

  const logout = () => {
    axios.defaults.headers.common["Authorization"] = null;
    localStorage?.removeItem("user");
    localStorage?.removeItem("token");
    navigate("/", { replace: true });
  };

  return {
    user,
    loginWithUserCredentials,
    signupWithUserCredentials,
    emailValidate,
    logout,
  };
};
