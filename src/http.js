import axios from 'axios'

export default axios.create({
    baseURL: 'https://teatroapi.herokuapp.com/',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
})
