import React from 'react';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Article, Email, Group, Home, Person, Settings} from "@mui/icons-material";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <Box flex={1.5} p={2} sx={{ display: { xs: "none", sm: "block" }, background: "#f9fafb" }}>
            <Box position="fixed" style={{width: 260, background: "#f9fafb", height: "100vh"}}>
                <List>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/me`}>
                            <ListItemButton component="a">
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                <ListItemText primary="Моя сторінка" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/`}>
                            <ListItemButton component="a">
                                <ListItemIcon>
                                    <Article />
                                </ListItemIcon>
                                <ListItemText primary="Новини" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/group`}>
                            <ListItemButton component="a">
                                <ListItemIcon>
                                    <Group />
                                </ListItemIcon>
                                <ListItemText primary="Спільноти" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/messages`}>
                            <ListItemButton component="a">
                                <ListItemIcon>
                                    <Email />
                                </ListItemIcon>
                                <ListItemText primary="Повідомлення" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/friends`}>
                            <ListItemButton component="a">
                                <ListItemIcon>
                                    <Person />
                                </ListItemIcon>
                                <ListItemText primary="Друзі" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/dashboard`}>
                            <ListItemButton component="a">
                                <ListItemIcon>
                                    <Settings />
                                </ListItemIcon>
                                <ListItemText primary="Панель адміністратора" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default observer(Sidebar);