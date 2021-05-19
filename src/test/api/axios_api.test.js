import axiosApi, { axiosInstance } from '../../api/axios_api';

axiosInstance.get = jest.fn();

describe('Axios api Get all boards', () => {
    it('Should get all board with image', () => {
        axiosApi.getAllBoards()
        expect(axiosInstance.get).toHaveBeenCalled()
        expect(axiosInstance.get).toHaveBeenCalledWith("/asset/board/full", null)
    })

    it('Should take true parameters to ask image resize', () => {
        axiosApi.getAllBoards(true)
        expect(axiosInstance.get).toHaveBeenCalled()
        expect(axiosInstance.get).toHaveBeenCalledWith("/asset/board/full", expect.objectContaining({params : {resizeImages: true}}))
    })

    it('Can take false parameters to ask image resize', () => {
        axiosApi.getAllBoards(false)
        expect(axiosInstance.get).toHaveBeenCalled()
        expect(axiosInstance.get).toHaveBeenCalledWith("/asset/board/full", null)
    })

    it('Can take empty parameters to not ask resize', () => {
        axiosApi.getAllBoards()
        expect(axiosInstance.get).toHaveBeenCalled()
        expect(axiosInstance.get).toHaveBeenCalledWith("/asset/board/full", null);
    })
});