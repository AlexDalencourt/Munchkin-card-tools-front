import { shallow } from 'enzyme';
import { Boards } from "../boards";
import ReactWrapper from "enzyme";
import axiosApi from "../../api/axios_api";

axiosApi.getAllBoards = jest.fn();

describe('Boards component should', () => {
    const picturesList = [{boardId: 1, image: "img1"}, {boardId: 2, image: "img2"}, {boardId: 3, image: "img3"}];

    beforeEach(() => {
        axiosApi.getAllBoards.mockReturnValue(Promise.resolve(picturesList));
    })

    it('Call api get all from initialisation', () => {
        shallow(<Boards />)

        expect(axiosApi.getAllBoards).toHaveBeenCalled();
    })

    it('Load all images on the component state', async () => {
        const wrapper = await shallow(<Boards/>);

        expect(wrapper.state("loadedBoards")).toEqual(picturesList);
    })

    it('Load all images must display an img on screen for each images', async () => {
        const wrapper = await shallow(<Boards/>);

        picturesList.forEach(currentImage => {
            // const imgNode = wrapper.findWhere(node => node.key === currentImage.boardId)
            const imgNode : ReactWrapper = wrapper.find("img[alt=" + currentImage.boardId + "]")

            expect(imgNode.exists()).toBeTruthy()
            expect(imgNode.type()).toEqual('img')
            expect(imgNode.prop("src")).toEqual("data:image/jpg;base64," + currentImage.image);
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})