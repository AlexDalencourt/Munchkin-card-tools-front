import { render, screen } from '@testing-library/react';
import {FileUpload, CardType} from "../../components/file_upload";
import axios from 'axios';
import { when } from 'jest-when';

jest.mock('axios');

beforeEach(() => {
    when(axios.get).calledWith("http://localhost:8080/cards/types").mockReturnValue(Promise.resolve({data: '{"TEST"}'}));

});

test('CardType should have one empty option', async () => {
    await render(<CardType />)

    const emptyOption = screen.getByRole("option", {name: ""});
    expect(emptyOption).toBeInTheDocument();
});

test('CardType, empty option should be selected on load', () => {
    render(<CardType />)

    const emptyOption = screen.getByRole("option", {name: "", selected: true});
    screen.debug(emptyOption);
    expect(emptyOption).toBeInTheDocument();
});

test('CardType, empty option must be disabled', () => {
    render(<CardType />)

    const emptyOption = screen.getByRole("option", {name: "", selected: true});
    expect(emptyOption).toBeDisabled();
})

test('CardType must call server to load all types', () => {
    render(<CardType />);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/cards/types");
});

// test('CardType should load types from server', () => {
//     // given
//
//     // when
//     render(<CardType />)
//
//     // then
//
// });

// test('Should set state on value form onChange', () => {
//     render(<FileUpload/>);
//     const linkElement = screen.getByText(/learn react/i);
//     expect(linkElement).toBeInTheDocument();
// });

afterEach(() => {
    jest.clearAllMocks();
});
