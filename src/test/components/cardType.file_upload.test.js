import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import { CardType } from "../../components/file_upload";
import axios from 'axios';
import { when } from 'jest-when';

jest.mock('axios');
const cardTypes = ["TEST1", "TEST2", "TEST3"];

describe("CardType component: ", () => {

    beforeEach(() => {
        when(axios.get)
            .calledWith("http://localhost:8080/cards/types")
            .mockReturnValue(Promise.resolve({data: cardTypes}));

    });

    it('Should have one empty option', async () => {
        await render(<CardType/>)

        const emptyOption = screen.getByRole("option", {name: ""});
        expect(emptyOption).toBeInTheDocument();
    });

    it('Empty option should be selected on load', () => {
        render(<CardType/>)

        const emptyOption = screen.getByRole("option", {name: "", selected: true});
        expect(emptyOption).toBeInTheDocument();
    });

    it('Empty option must be disabled', () => {
        render(<CardType/>)

        const emptyOption = screen.getByRole("option", {name: "", selected: true});
        expect(emptyOption).toBeDisabled();
    })

    it('Must call server to load all types', () => {
        render(<CardType/>);

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/cards/types");
    });

    it('Should display all types get from server', async () => {
        const wrapper = await shallow(<CardType/>);

        cardTypes.forEach((currentType, index) => {
            const generatedOption = wrapper.findWhere(node => node.key() === currentType);

            expect(generatedOption.exists()).toBeTruthy();
            expect(generatedOption.type()).toEqual("option");
            expect(generatedOption.text()).toEqual(currentType);
        })
    });

    it('Should call function in parameter when value change', () => {
        const triggerFunction = jest.fn();
        const wrapper = shallow(<CardType handleChange={triggerFunction}/>);
        expect(triggerFunction).not.toHaveBeenCalled();

        wrapper.find("select").simulate("change");

        expect(triggerFunction).toHaveBeenCalled();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

});
