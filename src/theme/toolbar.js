import clsx from "clsx";
import {AppBar, IconButton, Switch, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import {ThemeContext} from "../index";

export default class MunchkinToolbar extends React.Component {
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
                                    <Switch checked={currentTheme.themeState === true} onClick={event => currentTheme.setTheymeState(event.target.checked)}/>
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
                }
            </ThemeContext.Consumer>
        )
    }
}

