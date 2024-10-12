import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const token = localStorage.getItem("token")
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.log(error);
      }
    }
    if(token)
      fetchUsers();
    else
      navigate("/login")
  }, [token, navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {Array.isArray(users) && users.map(user => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard