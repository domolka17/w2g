import React, { useState } from 'react'
import {  createUser } from "./Controller/UserController";
import "./css/host.css";
import {useNavigate} from "react-router-dom"

const UserCreatrSide = () => {
    const [inp, setInput] = useState('')
    const navigate = useNavigate()
    const  handleButton =  () => {		// gives button its funktion
		createUser(inp)
        if(sessionStorage.getItem('redirect')!=null){
            const redirect = sessionStorage.getItem('redirect')
            sessionStorage.removeItem('redirect');
            navigate(sessionStorage.getItem(redirect))
        }
        else{
            navigate('/index')
        }
		
	}


  return (
    <>
    <body class="home">
        <div>
            <div class="hosttitle_text">
                <h1 class="hosttitle">Erstellen sie einen eigenen Raum für ihre Watchparty!</h1>
            </div>
            <div class="host_text">
                <p class="host_textbox">Bitte geben Sie einen Benutzernamen ein um diese Seite nutzen zu können.</p>
            </div>
            <div class="input">
                <div class="eins">
                <input type="text" class="input_box" placeholder="Benutzernamen eingeben zb.: Floppa" value={inp} onChange={(change) => setInput(change.target.value)}></input>
                </div>
                <div class="zwei">
						<button onClick={event => handleButton()} className="host_button">Bestätigen	</button>
                </div>
            </div>
        </div>
    </body>
</>
  )
}

export default UserCreatrSide