import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

function useLogout() {
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  async function logOut() {
    await axios.get(`${axios.defaults.serverURL}/auth/logout`);
    await getLoggedIn();
    navigate("/");
    window.location.reload();
  }

  return logOut;
}

export default useLogout;