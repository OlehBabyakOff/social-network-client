import React from 'react';
import {Avatar, Grid, ListItem, ListItemIcon, ListItemText} from "@mui/material";

const ChatMessage = () => {
    return (
        <ListItem>
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                </ListItemIcon>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align="left" primary="Oleh"></ListItemText>
                </Grid>
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