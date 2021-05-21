import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import { FileUpload } from "../file_upload";
import axiosApi from "../../api/axios_api";

global.URL.createObjectURL = jest.fn();
global.alert = jest.fn();
axiosApi.uploadNewBord = jest.fn();

describe("FileUpload component : ", () => {
    beforeEach(() => {
    });

    it("Should contain input file field", () => {
        render(<FileUpload/>);

        const inputField = screen.getByTitle("boardUpload");
        expect(inputField).toBeInTheDocument();
    });

    it("Should restrict input to image files", () => {
        render(<FileUpload/>);

        const inputField = screen.getByTitle("boardUpload");
        expect(inputField).toHaveAttribute("accept", "image/*");
    })

    it("Should load data structure on set new file on inputField", () => {

        const wrapper = shallow(<FileUpload/>);
        const inputField = wrapper.find("input[title='boardUpload']");
        const fileContent = "fileContent";
        const file = new Blob([fileContent], {type: 'image/*'});

        inputField.simulate("change", {target: {files: [file]}});

        expect(global.URL.createObjectURL).toHaveBeenCalled();
        expect(wrapper.state('selectedFile')).toEqual(file);
    })

    it("Should contain upload button", () => {
        render(<FileUpload/>);

        const inputField = screen.getByRole("button", {name: "goUpload"});
        expect(inputField).toBeInTheDocument();
    })

    it("Button upload should trigger post request only if file is set", () => {
        renderAndClickOnUpload();

        expect(axiosApi.uploadNewBord).not.toHaveBeenCalled();
    })

    it("Button upload should trigger alert if file file not set", () => {
        renderAndClickOnUpload();

        expect(global.alert).toHaveBeenCalled();
    })

    it("Button upload should post on server a formData structure with inputfile", () => {
        const selectedFile = new Blob(["Test"], {name: "testFile", type: 'image/*'});

        renderAndClickOnUpload((wrapper) => {
            wrapper.setState({selectedFile: selectedFile});
        });

        expect(axiosApi.uploadNewBord).toHaveBeenCalled();
        expect(axiosApi.uploadNewBord).toHaveBeenCalledWith(expect.any(FormData), null, null, null);
    });

    it("FileUpload should not display entire form if no image selected", () => {
        const wrapper = renderAndClickOnUpload();

        expect(wrapper.find("img").exists()).toBeFalsy();
        expect(wrapper.find("input[title='nbColumns']").exists()).toBeFalsy();
        expect(wrapper.find("input[title='nbLines']").exists()).toBeFalsy();
    });

    it("FileUpload should display the image on screen when image selected", () => {
        const selectedFile = new Blob(["Test"], {name: "testFile", type: 'image/*'});
        const selectedFileUrl = "img:url:blob";

        const wrapper = renderAndClickOnUpload(setupSelectedFile(selectedFile, selectedFileUrl));

        const imgComponent = wrapper.find("img[title='filePreview']");
        expect(imgComponent.exists()).toBeTruthy();
        expect(imgComponent.prop('src')).toEqual(selectedFileUrl);
    });

    it("FileUpload should display number of columns input", () => {
        const wrapper = renderAndClickOnUpload(setupSelectedFile());

        const inputColumns = wrapper.find("input[title='nbColumns']");
        expect(inputColumns.exists()).toBeTruthy();
        expect(inputColumns.props().type).toEqual("number");
    });

    it("FileUpload should display number of lines input", () => {
        const wrapper = renderAndClickOnUpload(setupSelectedFile());

        const inputLines = wrapper.find("input[title='nbLines']");
        expect(inputLines.exists()).toBeTruthy();
        expect(inputLines.props().type).toEqual("number");
    });

    it("FileUpload should display card type input", () => {
        const wrapper = renderAndClickOnUpload(setupSelectedFile());

        const cardType = wrapper.find("CardType");
        expect(cardType.exists()).toBeTruthy();
    });

    it("NumberOfColumns should update corresponding state property on change", () => {
        const wrapper = renderAndClickOnUpload(setupSelectedFile());

        const inputColumns = wrapper.find("input[title='nbColumns']");
        inputColumns.simulate("change", {target: {name: 'numberOfColumns', value: 2}});
        expect(wrapper.state('numberOfColumns')).toEqual(2);
    });

    it("NumberOfLines should update corresponding state property on change", () => {
        const wrapper = renderAndClickOnUpload(setupSelectedFile());

        const inputLines = wrapper.find("input[title='nbLines']");
        inputLines.simulate("change", {target: {name: 'numberOfLines', value: 10}});
        expect(wrapper.state('numberOfLines')).toEqual(10);
    });

    it("CardType should update corresponding state property on change", () => {
        const wrapper = renderAndClickOnUpload(setupSelectedFile());

        const cardType = wrapper.find("CardType");
        cardType.props().handleChange.call(undefined, {target: {name: 'type', value: 'MUNCHKIN'}});
        expect(wrapper.state('type')).toEqual('MUNCHKIN');
    });

    it("Button upload should post to the server the new image with parameters", () => {
        const numberOfLines = 2;
        const numberOfColumns = 1;
        const boardType = 'MUNCHKIN';
        renderAndClickOnUpload((wrapper) => {
            setupSelectedFile()(wrapper);
            wrapper.setState({
                numberOfColumns: 1,
                numberOfLines: 2,
                type: 'MUNCHKIN',
            });
        });

        expect(axiosApi.uploadNewBord).toHaveBeenCalled();
        expect(axiosApi.uploadNewBord)
            .toHaveBeenLastCalledWith(
                expect.anything(),
                numberOfColumns,
                numberOfLines,
                boardType
            );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});

let setupSelectedFile = function (selectedFile, selectedFileUrl) {
    return (wrapper) => {
        const finalSelectedFile = selectedFile ? selectedFile : new Blob(["Test"], {name: "testFile", type: 'image/*'});
        const finalSelectedFileUrl = selectedFileUrl ? selectedFileUrl : "img:url:blob";
        wrapper.setState({
            selectedFile: finalSelectedFile,
            selectedFileUrl: finalSelectedFileUrl,
        });
    };
};

function renderAndClickOnUpload(setupFunction = () => {}) {
    const wrapper = shallow(<FileUpload/>);
    const buttonSubmit = wrapper.find("button[title='goUpload']");

    setupFunction(wrapper);

    buttonSubmit.simulate("click");

    return wrapper;
}
