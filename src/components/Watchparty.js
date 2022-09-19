import React, { useState, useEffect } from 'react';
import "./css/watchparty.css";
import { useNavigate } from "react-router-dom"
import { joinRoom, leaveRoom } from './Controller/RoomController';
import ReactPlayer from 'react-player';
import { getVideo, getVideoPos, getVideoStat, postVideo, postVideoPos, postVideoStat } from './Controller/VideoController';
import { useParams } from 'react-router-dom';
import Chat from './Chat';


const Watchparty = () => {		// room siplay with userlist of rpp
	const [link, setLink] = useState('')
	const {roomid} = useParams()
	const navigate = useNavigate()
	const roomname = sessionStorage.getItem('roomname')
	//player stats
	const [url, setUrl] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [controls, setControls] = useState(true)
	const [position, setPosition] = useState(0)

	//handlers
	const handlePlay = () => {
		console.log('onPlay')

		postVideoStat('playing')
	}
	const handlePause = () => {
		console.log('onPause')
		postVideoStat('paused')
	}

	// constantly snyc once every 3 sekonds
	useEffect(() => {
		console.log("test check")
		checkInvite()
		const interval = setInterval(() => {
			sync()
			fetchData()
		}, 3000);
		return () => clearInterval(interval);
	}, []);
	//---------------------------------------
	// on load check
	const checkInvite=()=>{
		if(sessionStorage.getItem('id')== null)
		{
			window.sessionStorage.setItem("redirect", roomid)
			navigate('/UserCreateSide')
		}
		if(sessionStorage.getItem('id')!= null && sessionStorage.getItem('roomname')== null)
		{
			joinRoom(roomid)
			navigate('/Watchparty/'+roomid)
		}
	}

	//---------------------------------------
	// buttons
	const handleButton = () => {		// gives button its funktion leave, submit video
		setUrl(link)
		postVideo(link)
		console.log(url)
		console.log(window.location.href)
	}
	const handleButton2 = () => {		// gives button its funktion, leave Room
		leaveRoom(sessionStorage.getItem('roomname'))
		sessionStorage.removeItem('url')
		sessionStorage.removeItem('stat')
		navigate('/Room')
	}
	// syncs
	// calls multiple functions, which shouls sync different aspects of the player
	const sync = async () => {		//  the room should update, url, position
		syncUrl()
		compareState()
	}
	// takes value of getVideo and sets it as room(user) url, when url = compare nothing happens to the player, if compare was differen the player changes 
	const syncUrl = () => {
		const compare = getVideo()
		setUrl(compare)
		sessionStorage.setItem("url", url)
		return true
	}
	// should get the status of the video and paus/play the video, but doesnt work
	const compareState = () => {
		const a = getVideoStat()
		if (a == 'playing') {
			setPlaying(true)
		}
		if (a == 'paused') {
			setPlaying(false)
		}
	}
	// gets the video Podition of the server
	const comparePos = () => {
		const b = getVideoPos()
	}

	//_____________________________________________________________________________________________
	// user list
	const [data, getData] = useState([])
	const URL = 'https://gruppe13.toni-barth.com/rooms/' + roomname + '/users';



	const fetchData = () => {
		fetch(URL)
			.then((res) =>
				res.json())
			.then((response) => {
				console.log(response.users);
				getData(response.users);
			})

	}

	return (
		<>
			<body class="home">
				<div>
					<div class="partytitle_text">
						<h1 class="party_title">Raum: {roomname} </h1>
					</div>
					<div class="player">
						<ReactPlayer

							className='react-player'
							width={1280}
							height={720}
							url={url}
							playing={playing}
							controls={controls}
							onReady={() => console.log('onReady')}
							onStart={() => console.log('onStart')}
							onPlay={() => handlePlay()}
							onPause={() => handlePause()}
							onBuffer={() => console.log('onBuffer')}
							
							/>
						<p class="users">Nutzer in dieser Watchparty:</p>
							<p class="user_list">
								{data.map((user) => (
									<tr key={user.id}>
										<td>{user.name}</td>
									</tr>
								))}
							</p>
						
					</div>
					<div class="links">
						<input type="text" name="roomname" class="link_box" placeholder="Link einfügen" value={link} onChange={(change) => setLink(change.target.value)}></input>
						<button onClick={event => handleButton()} className="link_submit">Starten	</button>
						<button onClick={event => handleButton2()} className="link_leave">Raum Verlassen</button>
					</div>
					
					<div class="chat">
						<Chat/>

					</div>
				
				</div>
			</body>
		</>
	);
};

export default Watchparty
