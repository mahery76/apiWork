export const getFetch = () => {
    let res = []
    fetch("https://randomuser.me/api/?results=10")
    // fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
        res = data
        console.log(res)
    })
    .catch(error => {
        console.log("Error", error)
    })
}

