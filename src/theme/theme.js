import {Theme} from "@material-ui/core";
import {green, red} from "@material-ui/core/colors";

const {createMuiTheme} = require("@material-ui/core");

export const lightTheme = createMuiTheme({
    palette: {
        primary: red,
    }
});

export const darkTheme = createMuiTheme({
    palette: {
        primary: green,
    }
})

export function getThemeByName(theme: string) : Theme {
    return themeMap[theme];
}

const themeMap: {[key: string] : Theme } = {
    lightTheme,
    darkTheme,
}