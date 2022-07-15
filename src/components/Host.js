import React, { useState } from 'react'
import "./css/host.css";
import {useNavigate} from "react-router-dom"
import { createRoom } from "./Controller/RoomController";
import { deleteUser } from './Controller/UserController';

const  Host = () => {
	const [inp, setInput] = useState('')
	const navigate = useNavigate()
	const  handleButton = async () => {		// gives button its funktion
		for(let i =0; i<100;i++)
		{
			deleteUser(i)
		}
	}
	return (
		<>
			<body>
				<div>
					<div class="hosttitle_text">
						<h1 class="hosttitle"></h1>
					</div>
					<div class="host_text">
						<p class="host_textbox">Drücken um Alle User zu löschen</p>
					</div>
					<div class="input">
						<div class="zwei">
							<button onClick={event => handleButton()} className="host_button">Delete ALL</button>
						</div>
					</div>
				</div>
			</body>
		</>
	);
};

export default Host;
