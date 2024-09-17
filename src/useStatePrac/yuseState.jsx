import React, {useState} from 'react'

function YuseState() {
  
    const [name, setName] = useState("Bekyong");
    const [age, setAge] = useState(0);
    const [employeed, setEmployeed] = useState(false);

    const updateName = () => {
        setName("JV");
    }

    const incrementAge = () => {
        setAge(age + 1);
    }

    const changeStatus = () =>{
        setEmployeed(!employeed)
    }

    return (
    <>
        <p> Name: {name}</p>
        <button onClick={updateName}> Change Name</button>
        <p> age: {age}</p>
        <button onClick={incrementAge}> Age ++</button>
        <p> IS Employeed: {employeed ? "YES" : "NO"}</p>
        <button onClick={changeStatus}> Set Status</button>
    </>
  )
}

export default YuseState