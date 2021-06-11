import React, {Fragment, useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import {AppBar, IconButton, MuiThemeProvider, Switch, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {getThemeByName} from './theme/theme';

import FileUpload from "./components/file_upload";
import Boards from "./components/boards";
import './style/index.css';

const { REACT_APP_ENV } = process.env;
console.log(REACT_APP_ENV);

const ThemeProvider : React.FC = (props) => {
    const curThemeName = localStorage.getItem("appTheme") || "lightTheme";
    const [themeName, _setThemeName] = useState(curThemeName);
    const theme = getThemeByName(themeName);
    const setThemeName = (themeName: string): void => {
        localStorage.setItem("appTheme", themeName);
        _setThemeName(themeName);
    }

    console.log(theme)

    return (
        <ThemeContext.Provider value={{themeName, setThemeName}}>
            <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

const ThemeContext = React.createContext(({themeName, setThemeName}): void => {});


function App(){
    const currentTheme = useContext(ThemeContext)

    return (
        <Fragment>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        <img src={"Munchkin_banier.jpg"} alt={'Banier'} className={'banier'}>
                        </img>
                        <Switch onClick={event => currentTheme.setThemeName(event.target.checked ? 'darkTheme' : 'lightTheme')}/>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Router>
                <Route exact path={'/'} component={Boards}/>
                <Route path={'/upload'}>
                    <FileUpload />
                </Route>
            </Router>
        </Fragment>
    )
    }
// }

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
