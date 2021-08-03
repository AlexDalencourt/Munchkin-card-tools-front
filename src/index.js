import React, {Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

import clsx from "clsx";
import {
    createMuiTheme,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ThemeProvider as UiThemeProvider
} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PublishIcon from '@material-ui/icons/Publish';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

import {getThemeByState, useStyles} from './theme/theme';

import FileUpload from "./components/file_upload";
import Boards from "./components/boards";
import './style/index.css';
import MunchkinToolbar from "./theme/toolbar";


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
                <MunchkinToolbar handleDrawerOpen={handleDrawerOpen} navigationState={open}/>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link to={"/"}>
                            <ListItem button key={"AllBoards"}>
                                <ListItemIcon><ViewComfyIcon/></ListItemIcon>
                                <ListItemText primary={"All boards"}/>
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        <Link to={"/upload"}>
                            <ListItem button key={"Upload"}>
                                <ListItemIcon><PublishIcon/></ListItemIcon>
                                <ListItemText primary={"Upload new board"} />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Route exact path={'/'} component={Boards}/>
                    <Route path={'/upload'}>
                        <FileUpload />
                    </Route>
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
