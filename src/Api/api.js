
const Data = (values) => {
    const url = `https://lab-api-bq.herokuapp.com/users`
    fetch(url, {
        method: "POST",
        body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then((json) => console.log(json))
    .catch((e) => console.log(e))
     
}
export default Data; 