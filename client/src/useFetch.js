import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [ data, setData] = useState( null ); // make this generic so its reusable
    const [ isPending, setPending] = useState( true );
    const [ error, setError] = useState( null );

    useEffect(() => {
        fetch(url)
            .then(resp => {
                if(!resp.ok ){
                    throw Error('Could not fetch data for AJAX resource')
                }
                return resp.json();
            }).then ( data => {
            setData(data);
            setPending( false );
        })
            .catch(err =>{
                console.log(`connection error: ${err.message}`)
                alert( `Fetch Error: ${err.message }`)
                setError( err.message )
            })
    }, [url] );  //run when url changes
    return { data, isPending, error }  //return 3 objects
}

export default useFetch;