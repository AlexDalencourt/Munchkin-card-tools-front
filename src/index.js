import React, {Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {createMuiTheme, CssBaseline, ThemeProvider as UiThemeProvider} from "@material-ui/core";

import {getThemeByState, useStyles} from './theme/theme';

import FileUpload from "./components/file_upload";
import Boards from "./components/boards";
import './style/index.css';
import MunchkinHeaderToolbar, {MunchkinLateralToolbar} from "./theme/toolbars";
import CardList from "./components/card_list";


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

    const classes = useStyles();
    return (
        <ThemeContext.Provider value={{themeState, setThemeState, classes}}>
            <UiThemeProvider theme={theme}>{props.children}</UiThemeProvider>
        </ThemeContext.Provider>
    );
}

export const ThemeContext = React.createContext();

function App(){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <div className={classes.root}>
                <CssBaseline />
                <MunchkinHeaderToolbar handleDrawerOpen={handleDrawerOpen} navigationState={open}/>
                <MunchkinLateralToolbar handleDrawerClose={handleDrawerClose} navigationState={open}/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Route exact path={'/'} component={Boards}/>
                    <Route path={'/upload'}>
                        <FileUpload />
                    </Route>
                    <Route path={'/cards'} component={CardList}/>
                </main>
            </div>
        </Fragment>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
