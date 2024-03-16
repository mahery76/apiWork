import axios from "axios";
export const getAsyncAwaitData = async () => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
        console.log(response.data) 
        return response.data

    } catch (err) {
        console.log(err)
    }
}

