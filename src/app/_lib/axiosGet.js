import axios from "axios";
export const getAsyncAwaitData = async () => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
        console.log(response.data) 

    } catch (err) {
        console.log(err)
    }
}

