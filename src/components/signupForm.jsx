import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@mui/material/Alert";
import Grow from '@mui/material/Grow';
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";

import signup from "../api/services/signup";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(2),

        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "300px",
        },
        "& .MuiButtonBase-root": {
            margin: theme.spacing(1),
            width: "300px",
        },
        "& .MuiInputBase-input": {
            color: "wheat"
        },
    },
}));

const SignUpForm = (/* {handleClose} */) => {
    //"Global" user from context
    const { user, setUser } = useContext(UserContext);

    // state variables for each input
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCopy, setPasswordCopy] = useState("");
    const [identicalPasswords, setIdenticalPasswords] = useState(false);
    const [error, setError ] = useState(null);

    const classes = useStyles();
    //go to link
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(userName, email, password);
        const result = await signup({userName, email, password});
        console.log(result);

        if (result.acknowledged) {
            setUser({username: userName, email});
            history.push('/user');
            console.log({userName, email});
        } else {
            setError(result.msg);
        }
    };

    const clearError = () => setError(null);

    useEffect(()=>{
        console.log("useeffeckt: ", user);
    }, [user]);

    return (
        <form className={classes.root} onSubmit={handleSubmit} onFocus={clearError}>
            <TextField
                label="User Name"
                variant="filled"
                required
                value={userName}
                onChange={e => setUserName(e.target.value)}
            />
            <TextField
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                variant="filled"
                type="password"
                required
                value={password}
                onChange={e => {
                    setPassword(e.target.value);
                    setIdenticalPasswords(e.target.value  === passwordCopy);
                }
                }
            />
            <TextField
                label="Password"
                variant="filled"
                type="password"
                required
                value={passwordCopy}
                onChange={e => {
                    setIdenticalPasswords(e.target.value === password);
                    setPasswordCopy(e.target.value);
                }}

                error={!!password && !identicalPasswords}


            />
            <Grow in={error}>
                <Box p={2}>
                    <Alert variant="filled" severity="error">{error}</Alert>
                </Box>
            </Grow>
            <Button type="submit" variant="contained" color="primary">
                    Signup
            </Button>

            <Button variant="contained"  onClick={history.goBack}>
                Cancel
            </Button>

        </form>
    );
};

export default SignUpForm;
