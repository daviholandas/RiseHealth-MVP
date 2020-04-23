import axios from 'axios'

const http = axios.create({
  baseURL: process.env.API
})



export default ({ Vue }) => {
  Vue.prototype.$axios = http
}


export { http }