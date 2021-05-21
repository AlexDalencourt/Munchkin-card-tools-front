import axiosApi, { axiosInstance } from '../axios_api';

axiosInstance.get = jest.fn();
axiosInstance.post = jest.fn();

describe('Axios api : Get all boards', () => {
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

describe('Axios API: get all card types', () => {
    it('Should get all card types', () => {
        axiosApi.getAllCardTypes();
        expect(axiosInstance.get).toHaveBeenCalled();
        expect(axiosInstance.get).toHaveBeenCalledWith("/cards/types");
    })
})

describe('Axios API: upload new board', () => {
    it('Should post new board on URI', () => {
        axiosApi.uploadNewBord(jest.fn())
        expect(axiosInstance.post).toHaveBeenCalled();
        expect(axiosInstance.post).toHaveBeenCalledWith("/asset/board",expect.anything(),expect.anything());
    })

    it('Should take integer as first parameter for columns count', () => {
        axiosApi.uploadNewBord(jest.fn(), 1,2)
        expect(axiosInstance.post).toHaveBeenCalled();
        expect(axiosInstance.post).toHaveBeenCalledWith("/asset/board",expect.anything(),{params: expect.objectContaining({numberOfLines: 2})});
    })

    it('Should take integer as second parameter for lines count', () => {
        axiosApi.uploadNewBord(jest.fn(),1,2)
        expect(axiosInstance.post).toHaveBeenCalled();
        expect(axiosInstance.post).toHaveBeenCalledWith("/asset/board",expect.anything(),{params: expect.objectContaining({numberOfLines: 2})});
    })

    it('Should take string as third parameter for board type', () => {
        axiosApi.uploadNewBord(jest.fn(),1,2, "DUNGEON")
        expect(axiosInstance.post).toHaveBeenCalled();
        expect(axiosInstance.post).toHaveBeenCalledWith("/asset/board",expect.anything(),{params: expect.objectContaining({boardType: "DUNGEON"})});
    })

    it('Should take file blob as form data parameter', () => {
        const blob = jest.fn();
        axiosApi.uploadNewBord(blob,1,2, "DUNGEON")
        expect(axiosInstance.post).toHaveBeenCalled();
        expect(axiosInstance.post).toHaveBeenCalledWith("/asset/board",blob,{params: expect.objectContaining({boardType: "DUNGEON"})});
    })
})

afterEach(() => {
    jest.clearAllMocks();
})