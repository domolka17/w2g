import React, { useState, useEffect } from 'react'
import "./css/host.css";
import {useNavigate} from "react-router-dom"
import { createUser, deleteUser } from './Controller/UserController';
import { joinRoom, leaveRoom } from './Controller/RoomController';

const  Dev = () => {
	//delete users
	const  handleButton = async () => {		// gives button its funktion
		for(let i =0; i<100;i++)
		{
			deleteUser(i)
		}
	}
	// delete rooms
	
	useEffect(() =>{
		const interval = setInterval(() => {
	  fetchData(URL)
		  }, 5000);
		  return () => clearInterval(interval);
		}, []);


	const [data, getData] = useState([])
	const [user, setUser] = useState('')
    const URL = 'https://gruppe18.toni-barth.com/rooms/';
    const fetchData = () => {
      fetch(URL)
        .then((res) =>
          res.json())
        .then((response) => {
          console.log(response.rooms);
          getData(response.rooms);
        })
    }
	const handleButtonDELETEROOM =() =>
	{
		const name = data.at(1).name
		var user = null
		fetch('https://gruppe18.toni-barth.com/rooms/'+name+'/users', {
            method:'GET'
        })
		.then((res) =>
          res.json())
        .then((response) => {
			console.log(response)
          return response.users
        })
		.then((response) => {
			setUser(response.at(0))
		})
		console.log(user.at(0))
		
	}


	const handleButtoncreateUSER =() =>
	{
	
		const id = createUser('dev')
	}


	return (
		<>
			<body>
				<div className='butt'>
				<div class="zwei">
							<button onClick={event => handleButtoncreateUSER()} className="host_button">CREATE USER</button>
						</div>
						<div class="zwei">
							<button onClick={event => handleButton()} className="host_button">DELETE ALL USER</button>
						</div>
						<div class="zwei">
							<button onClick={event => handleButtonDELETEROOM()} className="host_button">DELETE ALL ROOMS</button>
						</div>
					
				</div>
			</body>
		</>
	);
};

export default Dev;
