

/**
 * get massage
 * put massage
 */


const url = 'https://gruppe13.toni-barth.com/rooms/'

    export const chatPost = (data, roomname) => {
        fetch(url+roomname+'/chat', {
            method:'PUT',
            headers:{"Content-Type": "application/json"},
            body:  JSON.stringify({"user": sessionStorage.getItem('id'),
                                   "message": data})
        })
    }

    