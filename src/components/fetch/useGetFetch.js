
import { useEffect, useState } from 'react'

function useGetFetch(url) {                     // gets DATA
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
       fetch(url)
           .then(response => {
               if (!response.ok) {      //if cant fetch/resource is faulty
                   throw Error('could not fetch');
               }
               return response.json(); //turns data in to a readable format
           })
           .then(data => {              // gets data and sets it as a state
               setLoading(false);
               setData(data);
               setError(null);
           })
           .catch((error) => {
               setLoading(false);
               setError(error.massage);
           });
   }, [url]);

   return { data, loading, error };     

}
export default useGetFetch;