import React, { useState, useEffect, useRef } from 'react';
import "./css/watchparty.css";
import { useNavigate } from "react-router-dom"
import { joinRoom, leaveRoom } from './Controller/RoomController';
import ReactPlayer from 'react-player';
import { getVideo, getVideoPos, getVideoStat, postVideo, postVideoPos, postVideoStat } from './Controller/VideoController';
import { useParams } from 'react-router-dom';
import Chat from './Chat';


const Watchparty = () => {		// room siplay with userlist of rpp
	const [roomLeader, setRoomleader]=useState(false)
	const [link, setLink] = useState('')
	const { roomid } = useParams()
	const navigate = useNavigate()
	const roomname = sessionStorage.getItem('roomname')
	const [data, getData] = useState([])
	const URL = 'https://gruppe13.toni-barth.com/rooms/' + roomname + '/users';
	//player stats
	const [url, setUrl] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [controls, setControls] = useState(true)
	const [progress, setProgress] = useState({ playedSeconds: 0.0, played: 0.0, loadedSeconds: 0.0, loaded: 0.0 })
	const refPlayer = useRef()
	//api sates
	const [apiState, setApiState]= useState('')
	const [apiPos, setApiPos] = useState(0)
	//handlers
	const handlePlay = () => 
	{
		if(apiState=='playing'){
			return
		}
		else{
			console.log('onPlay')
			postVideoStat('playing')
		}
		
	}
	const handlePause = () => {
		console.log('onPause')
		console.log(roomLeader)
		if(roomLeader==true){
			postVideoPos(progress.playedSeconds)
		}
		if(apiState=='paused')
		{
			return
		}
		else{
			postVideoStat('paused')
		}
		
	}
	const handleProgress=(pro)=>{
		setProgress(pro)
		console.log(progress)
		
	}

	const handleBuffer=(  )=>{
		console.log('onBuffer')
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

	// updates the player status with the api status
	useEffect(()=>{
		if(apiState=='playing'){
			if(playing==false){
				setPlaying(true)
			}
		}
		else{
			if(playing==true){
				setPlaying(false)
			}
		}
	},[apiState])
	// handles roomleader status change
	useEffect(()=>{
		if(roomLeader==true){
			
		}
		else{
			
		}
	},[roomLeader])
	// updates the player pos with api pos
	useEffect(()=>{
		
	},[apiPos])
	// loades leader data when data is available
	useEffect(()=>{
		if(data[0]==undefined)
		{

		}
		else{
			checkLeader()	
		}
	},[data])
	 
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
	// check leader 

	const [roomLeaderName, setRoomLeaderName] = useState('')

	const checkLeader=()=> {
		let user = data[0]
		console.log(user.name)
		setRoomLeaderName(data[0].name)
		if(user.name==sessionStorage.getItem('name')){
			setRoomleader(true)
		}
	}
	//---------------------------------------
	// buttons
	const handleButton = () => {		// gives button its funktion leave, submit video
		postVideoPos(0)
		setUrl(link)
		postVideo(link)
		console.log(url)
		setLink("")
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
		let st = {url:getVideo(), state: getVideoStat(), position: getVideoPos()}
		setApiState(st.state)
		syncUrl(st)
		if(roomLeader==false){
			compareProgress(st)
		}
	}
	// takes value of getVideo and sets it as room(user) url, when url = compare nothing happens to the player, if compare was differen the player changes 
	const syncUrl = (st) => {
		setUrl(st.url)
		sessionStorage.setItem("url", url)
		return true
	}
	
	// gets the video Progress of the server and syncs with server 
	const compareProgress = (st) => {
		
		console.log(st.position)
		console.log(progress.playedSeconds)
		if(st.position-progress.playedSeconds>2)
		{
			if(st.state == 'paused'){
				refPlayer.current.seekTo( st.position, "seconds")
			}
		}
		if(progress.playedSeconds-st.position>2)
		{
			if(st.state == 'paused'){
				refPlayer.current.seekTo( st.position, "seconds")
			}
		}
	}

	//_____________________________________________________________________________________________
	// user list
	



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
						<h1 class="party_title">Party-Leader: {roomLeaderName} </h1>
						<h1 class="party_title">Raumlink: https://domolka17.github.io/#/Watchparty/{roomname} </h1>
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
								ref={refPlayer}
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
											<td>{'" '+user.name+' "'}</td>
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