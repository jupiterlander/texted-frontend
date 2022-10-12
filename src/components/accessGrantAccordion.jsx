import React, { useState } from 'react';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from '@mui/material/Paper';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grow from '@mui/material/Grow';

import addAccess from '../api/services/addAccess';
import removeAccess from "../api/services/removeAccess";

import getSocket  from '../sockets/socketConnection';



export default function AccessGrantAccordion({id, setAccessUsers, socket}) {
    const [ error, setError ] = useState(false);
    const [ message, setMessage ] = useState(null);


    const handleOnChange = (e) => {
        setError(false);
        setMessage(null);
    };

    const handleSubmit = (e) => {
        const value = e.target[0].value;
        const action = e.nativeEvent.submitter.name;

        e.preventDefault();

        if (action === "add") {
            addAccess(id, value).then(
                res =>{
                    if (res.ok) {
                        setAccessUsers(res.access);
                        e.target[0].value = "";
                        setMessage(res.msg || "Ok!");
                        setError(false);
                    } else {
                        setMessage(res.msg || "Error!");
                        setError(true);
                    }
                }

            );
        } else if (action === "remove") {
            removeAccess(id, value).then(
                res =>{
                    if (res.ok) {
                        if (!socket) {
                            const tmpSocket = getSocket();

                            tmpSocket.emit("removeaccess", value, id, ()=>{
                                tmpSocket.disconnect();
                            });
                        } else {
                            socket.emit("removeaccess", value, id);
                        }
                        setAccessUsers(res.access);
                        e.target[0].value = "";
                        setMessage(res.msg || "Ok!");
                        setError(false);
                    } else {
                        setMessage(res.msg || "Error!");
                        setError(true);
                    }
                }
            );
        }
    };

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>User access</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Paper
                        component="form"
                        onSubmit={handleSubmit}
                        onChange={handleOnChange}
                        style={{
                            padding: "2rem",
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="standard"
                            placeholder="username"
                            inputProps={{"aria-label": "add user acces"}}
                            required="true"
                            onChange={handleOnChange}
                        />
                        <Button
                            name="add"
                            type="submit"
                            variant="contained"
                            endIcon={<PersonAddIcon />}
                            color="success"
                            style={{margin: "3rem 1rem 1rem"}}
                        >
                            Grant access for user
                        </Button>
                        <Button
                            name="remove"
                            type="submit"
                            variant="contained"
                            endIcon={<PersonRemoveIcon />}
                            color="error"
                            style={{margin: "3rem 1rem 1rem"}}
                        >
                            Remove access for user
                        </Button>
                        {message?
                            <Grow  in="true">
                                <Alert severity={error? "error": "success"}>{message}</Alert>
                            </Grow>
                            : null
                        }
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
