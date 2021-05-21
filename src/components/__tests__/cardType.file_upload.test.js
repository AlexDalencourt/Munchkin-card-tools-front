import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import { CardType } from "../file_upload";
import { when } from 'jest-when';
import axiosApi from "../../api/axios_api";

const cardTypes = ["TEST1", "TEST2", "TEST3"];

axiosApi.getAllCardTypes = jest.fn();

describe("CardType component: ", () => {

    beforeEach(() => {
        when(axiosApi.getAllCardTypes)
            .calledWith()
            .mockReturnValue(Promise.resolve(cardTypes))
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

        expect(axiosApi.getAllCardTypes).toHaveBeenCalledTimes(1);
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
