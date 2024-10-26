import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(null);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [config, setConfig] = useState(null);
  const [watchedTime, setWatchedTime] = useState(null);

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

  async function getConfig() {
    try {
      const profileRes = await axios.get(
        `${axios.defaults.serverURL}/auth/profile`
      );
      if (profileRes.data && profileRes.data.config) {
        setConfig(profileRes.data.config);
      } else {
        setConfig(null);
      }
    } catch (error) {
      console.error("Error fetching config:", error);
      setConfig(null);
    }
  }

  async function getWatchedTime() {
    try {
      const watchedTimeRes = await axios.get(
        `${axios.defaults.serverURL}/auth/profile/watched`
      );
      // console.log("Watched Time Response:", watchedTimeRes.data); // Add this line
      if (watchedTimeRes.data) {
        setWatchedTime(watchedTimeRes.data);
      } else {
        setWatchedTime(null);
      }
    } catch (error) {
      console.error("Error fetching watched time:", error);
      setWatchedTime(null);
    }
  }


  useEffect(() => {
    getLoggedIn();
    getProfile();
    getConfig();
    getWatchedTime();
  }, []);

  return (
    <AuthContext.Provider value={{
      loggedIn,
      getLoggedIn,
      username,
      getProfile,
      avatar,
      config,
      getConfig,
      watchedTime,
      getWatchedTime,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };