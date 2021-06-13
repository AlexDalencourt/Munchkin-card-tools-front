import {getThemeByState, lightTheme, darkTheme} from "../theme";

describe('theme common actions should', () => {
    it('return lightTheme when state is false', () => {
        const themeToUse = getThemeByState(false);

        expect(themeToUse).toEqual(lightTheme);
    })

    it('return darkTheme when state is true', () => {
        const themeToUse = getThemeByState(true);

        expect(themeToUse).toEqual(darkTheme);
    })
})