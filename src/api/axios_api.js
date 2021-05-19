import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

export default {
    getAllBoards: (needResize: boolean) => axiosInstance.get('/asset/board/full', needResize ? {params: {resizeImages: needResize}} : null)
}