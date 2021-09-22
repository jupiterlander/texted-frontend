import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: '80%',
        width: '500px',
        margin: 'auto'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.primary,
    },
}));

export default function GridLinks(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                {props.docs.length
                    ? props.docs.map(doc => (
                        <Grid item key={doc._id} component={Link} style={{ textDecoration: 'none' }}
                            to={`/editor/doc/${doc._id}`}
                            xs={12}
                            sm={6}
                        >
                            <Paper className={classes.paper}>
                                {doc._id}
                            </Paper>

                        </Grid>
                    ))
                    : null}
            </Grid>
        </div>
    );
}
