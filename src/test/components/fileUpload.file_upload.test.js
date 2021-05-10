import { render, screen } from '@testing-library/react';
import { when } from 'jest-when';
import {FileUpload} from "../../components/file_upload";
import axios from 'axios';

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

// test("Should load data structure on set new file on inputField", () => {
//     render(<FileUpload />)
//
//     const inputField = screen.getByTitle("boardUpload");
//     inputField.simulate
// })

test("Should contain upload button", () => {
    render(<FileUpload />);

    const inputField = screen.getByRole("button", {name: "Save"});
    expect(inputField).toBeInTheDocument();
})


afterEach(() => {
    jest.clearAllMocks();
})