import React from 'react';
import {
    Avatar,
    AvatarGroup,
    Box, Button, Divider, IconButton,
    ImageList,
    ImageListItem, List,
    ListItem,
    ListItemAvatar, ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import {observer} from "mobx-react-lite";

const Rightbar = () => {
    return (
        <Box flex={2} p={3} pl={0} sx={{ display: { xs: "none", sm: "block" } }}>
            <Box position="fixed" width={300} sx={{background: "#f9fafb", height: "100vh"}}>
                <Typography variant="h6" fontWeight={300}>
                    Знайомтесь з новими людьми
                </Typography>

                <List sx={{ width: '100%', maxWidth: 360, background: "#f9fafb" }}>
                    <ListItem
                        secondaryAction={
                            <Button variant="text">Підписатися</Button>
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar
                                    src="https://www.w3schools.com/howto/img_avatar.png"
                                />
                            </ListItemAvatar>
                            <ListItemText primary="Баб'як Олег" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        secondaryAction={
                            <Button variant="text">Підписатися</Button>
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar
                                    src="https://www.w3schools.com/howto/img_avatar.png"
                                />
                            </ListItemAvatar>
                            <ListItemText primary="Баб'як Олег" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        secondaryAction={
                            <Button variant="text">Підписатися</Button>
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar
                                    src="https://www.w3schools.com/howto/img_avatar.png"
                                />
                            </ListItemAvatar>
                            <ListItemText primary="Баб'як Олег" />
                        </ListItemButton>
                    </ListItem>

                </List>

                <Divider/>

                <Typography variant="h6" fontWeight={300} sx={{mt:3}}>
                    Вступайте до спільнот
                </Typography>

                <List sx={{ width: '100%', maxWidth: 360, background: "#f9fafb" }}>
                    <ListItem
                        secondaryAction={
                            <AvatarGroup max={3}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemText primary="Баб'як Олег" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        secondaryAction={
                            <AvatarGroup max={3}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemText primary="Баб'як Олег" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        secondaryAction={
                            <AvatarGroup max={3}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemText primary="Баб'як Олег" />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Box>
        </Box>
    );
};

export default observer(Rightbar);