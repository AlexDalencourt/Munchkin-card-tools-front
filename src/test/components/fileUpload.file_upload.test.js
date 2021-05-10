import { render, screen } from '@testing-library/react';
import { mount,shallow } from 'enzyme';
import {FileUpload} from "../../components/file_upload";

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
    global.URL.createObjectURL = jest.fn();

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

    const inputField = screen.getByRole("button", {name: "Save"});
    expect(inputField).toBeInTheDocument();
})


afterEach(() => {
    jest.clearAllMocks();
})