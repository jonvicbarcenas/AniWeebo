import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(null);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);

  async function getLoggedIn() {
    const loggedInRes = await axios.get(
      `${axios.defaults.serverURL}/auth/loggedIn`
    );
    setLoggedIn(loggedInRes.data);
  }

  async function getProfile() {
    const profileRes = await axios.get(
      `${axios.defaults.serverURL}/auth/profile`
    );
    if (profileRes.data && profileRes.data.username) {
      setUsername(profileRes.data.username);
      setAvatar(profileRes.data.avatar);
    } else {
      setUsername(null);
    }
  }

  useEffect(() => {
    getLoggedIn();
    getProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, username, getProfile, avatar }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };