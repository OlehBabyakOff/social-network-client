import React from 'react';
import {Avatar, ListItem, ListItemIcon, ListItemText} from "@mui/material";

const ChatMember = () => {
    return (
        <ListItem button key="RemySharp">
            <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
            <ListItemText secondary="online" align="right"></ListItemText>
        </ListItem>
    );
};

export default ChatMember;