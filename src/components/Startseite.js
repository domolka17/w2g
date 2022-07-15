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
				navigate('/Watchparty')
			}, 500)
			
		}
	}
	const handleButton2 = () => {		// gives button its funktion, join room
		navigate('/Room');
	}

	return (
		<>
			<body class="home">
				<div>
					<div class="title_text">
						<h1 class="title">Watch YouTube Together with Friends!</h1>
					</div>
					<div class="welcome_text">
						<p class="textbox">Genieße barrierefreie Unterhaltung zusammen mit deinen Freunden bei Watch2Gether der Hochschule Anhalt dank:</p>
					</div>
					<div>
						<p class="textbox">
							<ul>
								<li>
									Gänzliche Bedienbarkeit via Tastatur
								</li>
								<li>
									Farbblindenmodus (Coming Soon™)
								</li>
								<li>
									Text-To-Speech (Coming Soon™)
								</li>
								<li>
									Untertitel (Coming Soon™)
								</li>
							</ul>
						</p>
					</div>
					<div >
						<button onClick={event => handleButton1() } className="homescreen_buttons">Einen neuen Raum erstellen</button>
						<button onClick={event => handleButton2()} className="homescreen_buttons">Einen vorhanden Raum beitreten</button>
					</div>
				</div>
			</body>
		</>
	);
};

export default Home;
