import React, { useState, useRef, useEffect } from 'react';

import { Grid, FormControlLabel, Switch, Typography } from '@material-ui/core/';

function MultiUserToolBar({multiUser, setMultiUser, joined, disconnected}) {
    return (
        <Grid
            container
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            color="grey"
        >
            <Grid item xs={12} sm={3} md={2}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={multiUser}
                            onChange={() => setMultiUser(!multiUser)}
                        />
                    }
                    style={{color: multiUser ? "red" : "grey"}}
                    label="Multi-user"
                />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
                <Typography
                    variant="body1"
                    className={`doc-connections ${joined ? "action" : ""}`}
                >
                    Someone connected
                </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
                <Typography
                    variant="body1"
                    className={`doc-connections ${
                        disconnected ? "action" : ""
                    }`}
                >
                    Someone disconnected
                </Typography>
            </Grid>
        </Grid>
    );
}

export default MultiUserToolBar;
