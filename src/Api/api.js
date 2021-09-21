
 const Data = (values, endpoint, verb) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    const url = `https://lab-api-bq.herokuapp.com/` + endpoint;
    fetch(url, {
        method: verb,
        headers: headers,
        body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then((json) => console.log(json))
    .catch((e) => console.log(e))
     
}

export default Data;
