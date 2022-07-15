/*

 create user should be done
 delete user should be done
TODO get user state or figure out when user closes browser or leaves site
*/


// collection of funktions relates to the controll of a user

 export const createUser = (input) => {
    const url = 'https://gruppe18.toni-barth.com/users/'
    window.sessionStorage.setItem("name", input);
    //post user
    fetch(url, {
        method:'POST',
        headers:{"Content-Type": "application/json"},
        body:  JSON.stringify({"name": JSON.stringify(input)})  
    }).then((response) => { return response.json()})                 
    .then((data) => {window.sessionStorage.setItem("id", data.id)})   
    
    return  sessionStorage.getItem('id')
}

export const deleteUser = (id) => {                 // as an alternative one could change it, so this funktion would resive the id directly
        // delete request
        fetch('https://gruppe18.toni-barth.com/users/'+ id, {
          method:'DELETE', headers:{"Content-Type": "application/json"}
      })
    }
