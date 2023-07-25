import React, { useEffect, useState } from 'react';

function fetchData () {

    const [record, setRecords] = useState([])

    useEffect(() => {
        fetch('url')
        .then(response => response.json())
        .then(data => setRecords({record: data}))
        .catch(err => console.log(err))
    }, [])

    

}

export default fetchData;