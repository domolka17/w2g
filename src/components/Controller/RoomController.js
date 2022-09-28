/*
 create Room should be done
 delete Room should be done
 join room should be done
 leave room should be done
*/




// collection of funktions related to the controll of a room
const url = 'https://gruppe13.toni-barth.com/rooms/'

    export const createRoom =() => {
        //put request, creation of room
        fetch(url, {
            method:'POST' ,
            headers:{"Content-Type": "application/json"},             
        })
        //take respons, its the name of new room
        .then( response => {
           return response.json()})
        .then (data => { joinRoom(data.name)
        })  
    }
    export const joinRoom = (name) => {
        // get roomname and user id put them in url
        fetch(url + name +'/users', {
            method:'PUT',
            headers:{"Content-Type": "application/json"},
            body:  JSON.stringify({"user": sessionStorage.getItem('id')})
        })
        window.sessionStorage.setItem("roomname", name)
    }
    export const leaveRoom = (roomname) => {
        // delete user from room
        fetch(url +roomname+'/users', {
          method:'DELETE',
          headers:{"Content-Type": "application/json"},
          body:  JSON.stringify({"user": sessionStorage.getItem('id')})
      })
        //update theUser
        sessionStorage.removeItem('roomname');
    }
    


