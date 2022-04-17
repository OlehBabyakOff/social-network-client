import React, {useState} from 'react';
import {
    Avatar,
    Box, Button, Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Checkbox,
    IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import {EmailOutlined, MoreVert} from "@mui/icons-material";
import FriendSearch from "../Search/FriendSearch";

const FriendsList = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box flex={7} p={{xs: 0, md: 2, display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",}}>

                <FriendSearch/>

                <List dense sx={{width: '100%', maxWidth: 900, mt: 3,  bgcolor: 'background.paper'}}>
                    <ListItem sx={{lineHeight: 2}}
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar sx={{width: 60, height: 60}}
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                                />
                            </ListItemAvatar>
                            <Typography variant="span" sx={{fontWeight: 500, ml: 2, fontSize: 18}}>Баб'як Олег</Typography>
                        </ListItemButton>

                        <Button>
                            <EmailOutlined sx={{width: 25, height: 25}}/>
                        </Button>
                        <IconButton aria-label="settings">
                            <MoreVert id="basic-button"
                                      aria-controls={open ? 'basic-menu' : undefined}
                                      aria-haspopup="true"
                                      aria-expanded={open ? 'true' : undefined}
                                      onClick={handleClick}/>
                        </IconButton>
                    </ListItem>
                </List>
            </Box>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>Відписатися</MenuItem>
            </Menu>
        </>
    );
};

export default FriendsList;