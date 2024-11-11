import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;
        setLoading(true);
        fetch(url,{
            method: "GET",
            headers: {"Content-Type": "application/json",}
        })
            .then((res) =>{
                return res.json();
            })
            .then((response) =>{
                //console.log(response)
                setData(response);
            })
            .catch((error) =>{
                setError(error);
            }).finally(() => {
                setLoading(false);
            });
    }, [url]);

    return {data, loading, error}

}

export {useFetch};