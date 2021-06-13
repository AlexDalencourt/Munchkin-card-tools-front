import {green, red} from "@material-ui/core/colors";

export const lightTheme = {
    palette: {
        primary: red,
    }
};

export const darkTheme = {
    palette: {
        primary: green,
    }
}

export function getThemeByState(darkThemeState) {
    const themeName = darkThemeState === true ? 'darkTheme' : 'lightTheme';
    return themeMap[themeName];
}

let themeMap: { [key: string]: any };
themeMap = {
    lightTheme,
    darkTheme,
};