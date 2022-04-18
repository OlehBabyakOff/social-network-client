import React from 'react';
import {Grid, ListItem, ListItemText} from "@mui/material";

const ChatMessage = () => {
    return (
        <ListItem>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default ChatMessage;