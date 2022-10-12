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
                        <Grid item key={doc.id} component={Link} style={{ textDecoration: 'none' }}
                            to={`/editor/doc/${doc.id}`}
                            xs={12}
                            sm={6}
                        >
                            <Paper className={classes.paper}>
                                {doc.id}
                            </Paper>

                        </Grid>
                    ))
                    : null}
            </Grid>
            <h2>Access docs</h2>
            <Grid container spacing={4}>
                {props.access.length
                    ? props.access.map(obj => (
                        <Grid item key={obj.docs.id} component={Link} style={{ textDecoration: 'none' }}
                            to={`/editor/doc/${obj.docs.id}?accessmode=false&owner=${obj.profile.username}`}
                            xs={12}
                            sm={6}
                        >
                            <Paper className={classes.paper}>
                                {obj.profile.username}: {obj.docs.id}
                            </Paper>

                        </Grid>
                    ))
                    : null}
            </Grid>
        </div>
    );
}
