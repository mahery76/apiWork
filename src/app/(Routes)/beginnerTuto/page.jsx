"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const fetchData = () => {
    // return axios.get("https://randomuser.me/api/?results=10")
    return axios.get("http://localhost:3000/api/randomUser")
    .then(res => {
        return JSON.stringify(res.data, null, 2)
    })
    .catch(err => {
        console.error(err)
    })
}
function page() {
    const [jsonStringData, setJsonStringData] = useState    ('')
    useEffect(() => {
      fetchData().then((response) => {
        setJsonStringData(response)
      })
    },[])
    
    return (
    <div>
        <pre>{jsonStringData}</pre>
    </div>
  )
}

export default page

