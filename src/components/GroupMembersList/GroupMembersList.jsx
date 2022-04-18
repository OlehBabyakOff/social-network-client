import React from 'react';
import {Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemButton, Typography} from "@mui/material";

const GroupMembersList = () => {
    return (
        <List dense sx={{width: '100%', maxWidth: 900, mt: 1,  background: "#f9fafb"}}>
            <ListItem sx={{lineHeight: 2, background: "#f9fafb"}}
                      disablePadding
            >
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar sx={{width: 50, height: 50}}
                                src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                        />
                    </ListItemAvatar>
                    <Typography variant="span" sx={{fontWeight: 500, ml: 2, fontSize: 16}}>Баб'як Олег</Typography>
                </ListItemButton>

                <Button sx={{fontSize: 14}}>
                    Підписатися
                </Button>
            </ListItem>
        </List>
    );
};

export default GroupMembersList;