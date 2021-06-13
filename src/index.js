import React, {Fragment, useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";

import {AppBar, createMuiTheme, IconButton, ThemeProvider as MuiThemeProvider, Switch, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {getThemeByState} from './theme/theme';

import FileUpload from "./components/file_upload";
import Boards from "./components/boards";
import './style/index.css';

const { REACT_APP_ENV } = process.env;
console.log(REACT_APP_ENV);

const ThemeProvider : React.FC = (props) => {
    const curThemeState = localStorage.getItem("appTheme") || false;
    const [themeState, _setThemeState] = useState(curThemeState);
    const theme = createMuiTheme(getThemeByState(themeState));
    const setThemeState = (themeState): void => {
        localStorage.setItem("appTheme", themeState);
        _setThemeState(themeState);
    }

    return (
        <ThemeContext.Provider value={{themeState, setThemeState}}>
            <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

// const ThemeContext = React.createContext({themeState: false, setThemeName: createMuiTheme(getThemeByState(false))});
const ThemeContext = React.createContext();

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
                        <Switch checked={currentTheme.themeState === true} onClick={event => currentTheme.setThemeState(event.target.checked)}/>
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
