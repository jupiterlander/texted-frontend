import React, { useEffect } from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Stack } from '@mui/material';
import getAllAccess from "../api/services/getAllAccess";

import {
    Grid,
    FormControlLabel,
    Switch,
    Typography,
    Box
} from "@material-ui/core/";
import {Link} from "react-router-dom";

import AccessGrantAccordion from './accessGrantAccordion';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: "80%",
        width: "50rem",
        margin: "auto",
        padding: "3rem 0"
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
    },
}));

export default function AccessGrid({
    id,
    users,
    setAccessUsers,
    multiUser,
    setMultiUser,
    joined,
    disconnected,
    socket
}) {
    const classes = useStyles();

    // useEffect(()=> {
    //     console.log("getAllAcess", id);
    //     const cons = async ()=>console.log(await getAllAccess(id));
    //     cons();
    // }, [id]);

    return (
        <Box className={classes.root}>
            <Stack spacing={2}>
                <AccessGrantAccordion  id={id} setAccessUsers={setAccessUsers} 
                setMultiUser={setMultiUser} socket={socket}/>
                {users
                    ? users.map(username => (
                        <Grid
                            container
                            item
                            className={classes.paper}
                            xs={12}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            component={Paper}
                        >
                            <Grid item style={{display: "inline-flex"}}>
                                <Typography align={"left"}>
                                    {username}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))
                    : null}
            </Stack>
        </Box>
    );
}
