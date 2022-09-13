/**
 *  Chat window
 *  TODO manages Chat
 *  TODO uses get and posts
 *  TODO exports it selfe, needs css style
 *  TODO writing message and submit it
 * 
 */

import React, { useEffect, useState } from 'react'
import {  chatPost } from './Controller/ChatController'
import "./css/Chat.css";


const Chat = () => {
    const [messageList, getListData]= useState([])
    const [message, setMessage] = useState('')
    const [chatData, getChatData]= useState([])
    const [userData, getUserData] = useState([])
    const roomname = sessionStorage.getItem('roomname')
    
    var listData = []

    useEffect(() => {
        const interval = setInterval(() => {
                fetchChatData(roomname)
                fetchUserData(roomname)
               

                console.log('Update Chat')
		}, 3000);
		return () => clearInterval(interval);
	}, []);

    // submit message button
    const handleButton = ()=>{
        chatPost(message, sessionStorage.getItem('roomname'))
        // after posting message, emptys message-input
        setTimeout(function () {
            setMessage('')
        }, 500)
    }

    /** 
    const convertChat=()=>{
        
        var check = false
        var temp = [{author: 'user', text:'item.text', time: 'item.time'}]

        chatData.forEach((item)=>{
            
            //cheks if user is in room, if nut user.name= undefined
            const user = userData.find((person=>{
                return person.id == item.userId}))
            console.log(user)
            // as a standart
            var username="deleted User"

            // if user is in userlist / in room
            if(user!=undefined)
            {
                username= user.name
            }

            // cleanes up the initial array + assings the first slot/ the scond if the first is a real message
            if(temp.length==1){
                if(temp[0].time=='item.time'){
                    temp[0]= {author: username, text: item.text, time: item.time}
                    const t = {author: username, text: item.text, time: item.time}
                }
                else{
                    temp[1]= {author: username, text: item.text, time: item.time}
                    
                }
                //other cheks wont trigger for this.item if this is true
                check= true
            }
            // prosseses the other objects in chatData 
            if(temp.length>1 && check==false)
            {
                temp[temp.length]= {author: username, text: item.text, time: item.time}
            }

            check=false

        })
        console.log(temp)
    }
    */
    //____________________________

    const fetchChatData = (roomname) => {
        
        fetch('https://gruppe13.toni-barth.com/rooms/'+roomname+'/chat', {
            method:'GET'
        }).then((res) =>
        res.json()).then((response)=> {
            getChatData(response.messages);
            console.log(chatData)
        })
        
    }

    const fetchUserData = (roomname) => {
		fetch('https://gruppe13.toni-barth.com/rooms/' + roomname + '/users')
			.then((res) =>
				res.json())
			.then((response) => {
				getUserData(response.users);
                console.log(userData)
			})

	}
    
  return (
    <div className='ChatBox'>
        <div className='messageBox'>
			{chatData.map( line => <ul className='massage' key={line.time}>{line.userId+': '+line.text}</ul>)}
        </div>
        <div className='ChatSubmitbar'>
            <input type="text"  class="submit" placeholder="Narricht schreiben" value={message} onChange={(change) => setMessage(change.target.value)}></input>
            <button onClick={event => handleButton()} className="message_submit">Send</button>
       
        </div>
    </div>
    
  )
}

export default Chat