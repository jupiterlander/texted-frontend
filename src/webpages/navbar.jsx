import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountBoxIcon from '@mui/icons-material/AccountBox';


import { UserContext } from "../context/userContext";
//import { UserState } from "../context/UserState";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#0000",
        color: "smokewhite"
    },
}));



function Navbar(props) {
    const [selected, setSelected] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();
    const classes = useStyles();

    const handleTabs = (_e, val)=>{
        setSelected(val);
    };

    useEffect(()=>{
        const links = ['/home', '/editor', '/alldocs', '/user'];
        const pathName = location.pathname;

        let index = false;

        if (pathName === '/') {
            index = 0;
        } else {
            index = links.findIndex((link=>pathName.startsWith(link)));
        }
        console.log("user", user);
        setSelected(index);
    }, [location.pathname, user]);

    return (
        <div>
            <AppBar position="static" className={classes.root}>
                <Tabs centered value={selected} onChange={handleTabs}>
                    <Tab label="Home" component={Link} to={'/'}/>
                    <Tab label="Editor" component={Link} to={'/editor'} disabled={!user}/>
                    <Tab label="Docs" component={Link} to={'/alldocs'}
                        disabled={!user} />
                    <Tab icon={<AccountBoxIcon />} label={user? `${user.username}`: 'User'}
                        component={Link} to={'/user'}/>
                </Tabs>
            </AppBar>
        </div>
    );
}

export default Navbar;
