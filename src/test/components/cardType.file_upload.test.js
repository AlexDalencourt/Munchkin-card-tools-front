import { render, screen } from '@testing-library/react';
import {CardType} from "../../components/file_upload";
import axios from 'axios';
import { when } from 'jest-when';

jest.mock('axios');
const cardTypes = ["TEST1", "TEST2", "TEST3"];

beforeEach(() => {
    when(axios.get)
        .calledWith("http://localhost:8080/cards/types")
            .mockReturnValue(Promise.resolve({data: cardTypes}));

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

test('CardType should display all types get from server', async () => {
    await render(<CardType />);

    cardTypes.forEach((currentType, index) => {
        let generatedOption = screen.getByRole("option", {name: currentType})
        expect(generatedOption).toBeInTheDocument();
        expect(generatedOption).toHaveValue(currentType);
    })

});

afterEach(() => {
    jest.clearAllMocks();
});