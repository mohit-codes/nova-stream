import axios from "axios";
import { BASE_URL } from "../utils/utility";
import { useNavigate } from "react-router-dom";
import { AuthContext, UserDataContext } from "../contexts/";
import { useContext, useState } from "react";

export const useAuth = () => {
  const { user, setUser, setToken, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userDispatch } = useContext(UserDataContext);

  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  async function fetchUserData() {
    setLoading(true);
    if (user?._id) {
      const { data } = await axios.get(`${BASE_URL}/user/user-data`);
      if (data.success) {
        userDispatch({
          type: "INITIALIZE_DATA",
          payload: {
            playlists: data.playlists,
            history: data.history,
            liked: data.liked,
          },
        });
      }
    }
    setLoading(false);
  }

  async function loginWithUserCredentials(email, password) {
    setLoading(true);
    const { data } = await axios.post(`${BASE_URL}/user/login`, {
      email: email,
      password: password,
    });
    if (data.success) {
      setUser(data.user);
      setToken(data.token);
      userDispatch({
        type: "INITIALIZE_DATA",
        payload: {
          playlists: data.playlists,
          history: data.history,
          liked: data.liked,
        },
      });
      axios.defaults.headers.common["authorization"] = `Bearer ${data.token}`;
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
      axios.defaults.headers.common["authorization"] = `Bearer ${data.token}`;
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
    setUser(null);
    setToken(null);
    axios.defaults.headers.common["authorization"] = null;
    userDispatch({ type: "ERASE" });
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return {
    user,
    loginWithUserCredentials,
    signupWithUserCredentials,
    emailValidate,
    logout,
    loading,
    fetchUserData,
  };
};
