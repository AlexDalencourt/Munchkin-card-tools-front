import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

export default {
    getAllBoards: (needResize) => axiosInstance.get('/asset/board/full', {params: { }})
}