import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

const axiosApi = {
    getAllBoards: (needResize: boolean) => axiosInstance.get('/asset/board/full', needResize ? {params: {resizeImages: needResize}} : null),

    getAllCardTypes: () => axiosInstance.get('/cards/types'),

    uploadNewBord: (formData, numberOfColumns: number,numberOfLines: number,boardType: string) => {axiosInstance.post('/asset/board', formData, {params: {numberOfColumns,numberOfLines, boardType}})},
}

export default axiosApi;
