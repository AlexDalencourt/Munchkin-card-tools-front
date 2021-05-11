import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import { FileUpload } from "../../components/file_upload";
import axios from "axios";

global.URL.createObjectURL = jest.fn();
global.alert = jest.fn();
axios.post = jest.fn();

beforeEach(() => {
});

test("Should contain input file field", () => {
    render(<FileUpload />);

    const inputField = screen.getByTitle("boardUpload");
    expect(inputField).toBeInTheDocument();
});

test("Should restrict input to image files", () => {
    render(<FileUpload />);

    const inputField = screen.getByTitle("boardUpload");
    expect(inputField).toHaveAttribute("accept", "image/*");
})

test("Should load data structure on set new file on inputField", () => {

    const wrapper = shallow(<FileUpload />);
    const inputField = wrapper.find("input[title='boardUpload']");
    const fileContent = "fileContent";
    const file = new Blob([fileContent], {type : 'image/*'});

    inputField.simulate("change", {target: {files: [file]}});

    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(wrapper.state('selectedFile')).toEqual(file);
})

test("Should contain upload button", () => {
    render(<FileUpload />);

    const inputField = screen.getByRole("button", {name: "goUpload"});
    expect(inputField).toBeInTheDocument();
})

test("Button upload should trigger post request only if file is set", () => {
    renderAndClickOnUpload();

    expect(axios.post).not.toHaveBeenCalled();
})

test("Button upload should trigger alert if file file not set", () => {
    renderAndClickOnUpload();

    expect(global.alert).toHaveBeenCalled();
})



test("Button upload should post on server a formData structure with inputfile", () => {
    const selectedFile = new Blob(["Test"], {name: "testFile",type : 'image/*'});

    renderAndClickOnUpload((wrapper) => {
        wrapper.setState({selectedFile: selectedFile});
    });

    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenLastCalledWith("http://localhost:8080/asset/board", expect.any(FormData), expect.anything());
})

test("FileUpload should not display entire form if no image selected", () => {
    const wrapper = renderAndClickOnUpload();

    expect(wrapper.find("img").exists()).toBeFalsy();
    expect(wrapper.find("input[title='nbColumns']").exists()).toBeFalsy();
    expect(wrapper.find("input[title='nbLines']").exists()).toBeFalsy();
});

test("FileUpload should display the image on screen when image selected", () => {
    const selectedFile = new Blob(["Test"], {name: "testFile",type : 'image/*'});
    const selectedFileUrl = "img:url:blob"

    const wrapper = renderAndClickOnUpload((wrapper) => {
        wrapper.setState({selectedFile: selectedFile});
        wrapper.setState({selectedFileUrl: selectedFileUrl});
    });

    const imgComponent = wrapper.find("img[title='filePreview']");
    expect(imgComponent.exists()).toBeTruthy();
    expect(imgComponent.prop('src')).toEqual(selectedFileUrl);
});

afterEach(() => {
    jest.clearAllMocks();
})

function renderAndClickOnUpload(setupFunction = () => {}) {
    const wrapper = shallow(<FileUpload/>);
    const buttonSubmit = wrapper.find("button[title='goUpload']");

    setupFunction(wrapper);

    buttonSubmit.simulate("click");

    return wrapper;
}
