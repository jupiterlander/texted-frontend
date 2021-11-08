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



export default function AccessGrantAccordion({id, setAccessUsers}) {
    const [error, setError ] = useState('');


    const handleOnChange = (e) => {
        setError(false);
    };

    const handleSubmit = (e) => {
        const value = e.target[0].value;
        const action = e.nativeEvent.submitter.name;

        e.preventDefault();
        console.log("(e.target[0].value: ", e.target[0].value);
        console.log("(e.target: ", e.target);
        console.log(
            "(e.nativeEvent.submitter.name",
            e.nativeEvent.submitter.name,
        );

        if (action === "add") {
            addAccess(id, value).then(
                res =>{
                    if (res.ok && res.result.modifiedCount) {
                        setAccessUsers(res.access);
                        e.target[0].value = "";
                    } else {
                        setError(res.msg || "Error");
                    }
                }

            );
        } else if (action === "remove") {
            removeAccess(id, value).then(
                res =>{
                    if (res.result.modifiedCount) {
                        setAccessUsers(res.access);
                        e.target[0].value = "";
                    } else {
                        setError(res.msg || "Error");
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
                        <Grow in={error}>
                            <Alert severity="error">{error}</Alert>
                        </Grow>
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
