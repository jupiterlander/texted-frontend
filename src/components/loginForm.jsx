import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Grow from '@mui/material/Grow';
import Box from '@material-ui/core/Box';

import login from "../api/services/login";

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
        }
    },
}));

const LoginForm = (/* {handleClose} */) => {
    //"Global" user from context
    const { user, setUser } = useContext(UserContext);

    //go to link
    const history = useHistory();

    // state variables for each input
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // error
    const [error, setError ] = useState(null);

    const classes = useStyles();

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(userName, password);
        const result = await login({userName, password});

        console.log("result;", result);

        if (result.user) {
            setUser(result.user);
            history.push('/user');
        } else {
            setError(result.msg);
        }
    };

    const clearError = () => setError(null);

    useEffect(()=>{
        console.log("useeffeckt: ", user);
    }, [user]);

    return (
        <form
            className={classes.root}
            onSubmit={handleSubmit}
            onFocus={clearError}
        >
            <TextField
                label="User Name"
                variant="filled"
                required
                value={userName}
                onChange={e => setUserName(e.target.value)}
            />

            <TextField
                label="Password"
                variant="filled"
                type="password"
                required
                value={password}
                onChange={e => {
                    setPassword(e.target.value);
                }
                }
            />
            <Grow in={error}>
                <Box p={2}>
                    <Alert variant="filled" severity="error">{error}</Alert>
                </Box>
            </Grow>
            <Button type="submit" variant="contained" color="primary">
                    Login
            </Button>
            <div>
                <Button variant="contained" /* onClick={handleClose} */>
                    Cancel
                </Button>
                <Button component={Link} to="/signup" variant="contained" color="primary" >
                    Signup
                </Button>
                {/* <Button type="submit" variant="contained" color="primary">
                    Signup
                </Button> */}
            </div>
        </form>
    );
};

export default LoginForm;
