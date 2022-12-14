/*
 create user should be done
 delete user should be done
*/


// collection of funktions relates to the controll of a user
const url = 'https://gruppe13.toni-barth.com/users/'
 export const createUser = (input) => {
   
    window.sessionStorage.setItem("name", input);
    //post user
    fetch(url, {
        method:'POST',
        headers:{"Content-Type": "application/json"},
        body:  JSON.stringify({"name": input})  
    }).then((response) => { return response.json()})                 
    .then((data) => {window.sessionStorage.setItem("id", data.id)})   
    
    return  sessionStorage.getItem('id')
}

export const deleteUser = (id) => {                 // as an alternative one could change it, so this funktion would resive the id directly
        // delete request
        fetch(url+ id, {
          method:'DELETE', headers:{"Content-Type": "application/json"}
      })
    }
