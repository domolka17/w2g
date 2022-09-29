import React from 'react';
import "./css/Startseite.css";
import { useNavigate} from "react-router-dom"
import { createRoom } from './Controller/RoomController';




const Home = () => {
	const navigate = useNavigate()
	const handleButton1 = () => {		// gives button its funktion, create room
		if(sessionStorage.getItem('id')==null){
			navigate('/UserCreateSide')
		}
		else{
			createRoom()
			setTimeout(function() {
				navigate('/Watchparty/'+sessionStorage.getItem('roomname'))
			}, 500)
			
		}
	}
	const handleButton2 = () => {		// gives button its funktion, join room
		navigate('/Room');
	}

	return (
		<>
			<body >
				<div>
					<div class="title_text">
						<p class="title">Watch YouTube Together with Friends!</p>
					</div>

					<div class="welcome_text">
						<p class="text">Genieße barrierefreie Unterhaltung zusammen mit Freunden bei Watch2Gether der Hochschule Anhalt dank:</p>
					</div>

					<div class="textbox">
						<p>
							<ul>
								<li>
									Gänzliche Bedienbarkeit via Tastatur
								</li>
								<li>
									ScreenReader Unterstützung
								</li>
								<li>
									Yeet-To-Speech (Coming Soon™)
								</li>
								<li>
									Untertitel (Coming Soon™)
								</li>
							</ul>
						</p>
					</div>

					<div class="buttonContainer">
						<button onClick={event => handleButton1() } class="homescreen_buttons" >Einen Raum erstellen</button>
						<button onClick={event => handleButton2()} class="homescreen_buttons">Einen Raum beitreten</button>
					</div>
					
				</div>
			</body>
		</>
	);
};

export default Home;