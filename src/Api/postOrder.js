const Order = (values, endpoint, verb) => {
    const token = localStorage.getItem("token"); 
    
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
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

export default Order;