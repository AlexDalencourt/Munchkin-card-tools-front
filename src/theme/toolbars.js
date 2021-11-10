import clsx from "clsx";
import {
    AppBar,
    Divider, Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon, ListItemText,
    Switch,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import {ThemeContext} from "../index";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {Link} from "react-router-dom";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import PublishIcon from "@material-ui/icons/Publish";
import {useStyles} from "./theme";

export default class MunchkinHeaderToolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <ThemeContext.Consumer>
                {currentTheme =>
                    <div>
                        <AppBar position="fixed" className={clsx(currentTheme.classes.appBar, {
                            [currentTheme.classes.appBarShift]: this.props.navigationState,
                        })}>
                            <Toolbar>
                                <IconButton edge="start"  color="inherit" aria-label="menu" onClick={this.props.handleDrawerOpen}>
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" color="inherit">
                                    <img src={"Munchkin_banier.jpg"} alt={'Banier'} className={'banier'}/>
                                    <Switch checked={currentTheme.themeState === true} onClick={event => currentTheme.setThemeState(event.target.checked)}/>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
                }
            </ThemeContext.Consumer>
        )
    }
}

export function MunchkinLateralToolbar(props) {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: props.navigationState,
                [classes.drawerClose]: !props.navigationState,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.navigationState,
                    [classes.drawerClose]: !props.navigationState,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={props.handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <List>
                <Link to={"/"}>
                    <ListItem button key={"AllBoards"}>
                        <ListItemIcon><ViewComfyIcon/></ListItemIcon>
                        <ListItemText primary={"All boards"}/>
                    </ListItem>
                </Link>
            </List>
            <Divider/>
            <List>
                <Link to={"/upload"}>
                    <ListItem button key={"Upload"}>
                        <ListItemIcon><PublishIcon/></ListItemIcon>
                        <ListItemText primary={"Upload new board"}/>
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    )
}

