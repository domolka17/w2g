import React, { useState, useEffect, useRef } from 'react';
import "./css/watchparty.css";
import { useNavigate } from "react-router-dom"
import { joinRoom, leaveRoom } from './Controller/RoomController';
import ReactPlayer from 'react-player';
import { getVideo, getVideoPos, getVideoStat, postVideo, postVideoPos, postVideoStat } from './Controller/VideoController';
import { useParams } from 'react-router-dom';
import Chat from './Chat';


const Watchparty = () => {		// room siplay with userlist of rpp
	const [link, setLink] = useState('')
	const { roomid } = useParams()
	const navigate = useNavigate()
	const roomname = sessionStorage.getItem('roomname')
	//player stats
	const [url, setUrl] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [controls, setControls] = useState(true)
	const [position, setPosition] = useState(0)
	const [progress, setProgress] = useState({ played: 0.0, playedSeconds: 0.0, loaded: 0.0, loadedSeconds: 0.0 })
	const refPlayer = useRef()

	//handlers
	const handlePlay = () => {
		console.log('onPlay')

		postVideoStat('playing')
	}
	const handlePause = () => {
		console.log('onPause')
		postVideoStat('paused')
	}
	const handleProgress=(pro)=>{
		setProgress(pro)
		console.log(progress)
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

	useEffect(()=>{
        console.log(progress)
		
    }, [progress]);
	 
	//---------------------------------------
	// on load check
	const checkInvite = () => {
		if (sessionStorage.getItem('id') == null) {
			window.sessionStorage.setItem("redirect", roomid)
			navigate('/UserCreateSide')
		}
		if (sessionStorage.getItem('id') != null && sessionStorage.getItem('roomname') == null) {
			joinRoom(roomid)
			navigate('/Watchparty/' + roomid)
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
	// gets the video Progress of the server and syncs with server 
	const compareProgress = () => {
		const b = getVideoPos()
		if(b>progress.played)
		{
			refPlayer.current.seekTo( b, "seconds")
		}

		if(b<progress.played)
		{
			refPlayer.current.seekTo( b, "seconds")
		}
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
						<button onClick={event => handleButton2()} className="link_leave" aria-live="polite">Verlassen</button>
					</div>
					<div class="links">
						<input type="text" name="roomname" class="link_box" placeholder="Link einfügen" value={link} onChange={(change) => setLink(change.target.value)}></input>
						<button onClick={event => handleButton()} className="link_submit" aria-live="polite">Starten	</button>
						
					</div>

					<div>
						<div class="player">
							<ReactPlayer
								width="70%"
								height="70%"
								class='reactplayer'
								url={url}
								playing={playing}
								controls={controls}
								onReady={() => console.log('onReady')}
								onStart={() => console.log('onStart')}
								onPlay={() => handlePlay()}
								onPause={() => handlePause()}
								onBuffer={() => console.log('onBuffer')}
								onProgress={(pro)=> handleProgress(pro)}
								onSeek={()=> console.log("UUUU")}
							/>

						</div>
					</div>

					<div>
						<div class="user_box">
							<div>
								<p class="users">Nutzer in dieser Watchparty:</p>
								<p class="user_list">
									{data.map((user) => (
										<tr key={user.id}>
											<td>{user.name}</td>
										</tr>
									))}
								</p>
							</div>
						</div>
					</div>
					<div class="chat" role="log" aria-live="polite">
						<Chat />
					</div>

				</div>
			</body>
		</>
	);
};

export default Watchparty
