import axios from "axios";

// const yourAccessToken = localStorage.getItem('userEmail');

const instance  = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
    //   'Authorization': `Bearer ${yourAccessToken}`,
      'Content-Type': 'application/json',
    },
})

export default instance