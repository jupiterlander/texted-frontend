import React, { useContext } from 'react';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import logout from '../api/services/logout';
import { Stack } from '@mui/material';
import {useHistory} from "react-router-dom";


function UserPage() {
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    return (
        <div>
            <h1>User</h1>
            <h3>{user ? user.username : "Not logged in!"}</h3>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                {user ? (
                    <Button
                        onClick={() => {
                            logout();
                            setUser(null);
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button
                            component={Link}
                            to="/user/login"
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                        <Button variant="contained" onClick={history.goBack}>
                            Cancel
                        </Button>
                        <Button
                            component={Link}
                            to="/user/signup"
                            variant="contained"
                            color="primary"
                        >
                            Signup
                        </Button>
                    </>
                )}
            </Stack>
        </div>
    );
};

export default UserPage;
