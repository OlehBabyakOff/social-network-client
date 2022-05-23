import React from 'react';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Article, Email, Group, Home, Person, Photo, Settings} from "@mui/icons-material";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <Box flex={1.5} p={2} sx={{ display: { xs: "none", sm: "block" }, background: "#f9fafb" }}>
            <Box position="fixed" style={{width: 260, background: "#f9fafb", height: "100vh"}}>
                <List>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/me`}>
                            <ListItemButton>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                <ListItemText primary="Моя сторінка" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/`}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Article />
                                </ListItemIcon>
                                <ListItemText primary="Новини" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/friends`}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Person />
                                </ListItemIcon>
                                <ListItemText primary="Підписки" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/groups`}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Group />
                                </ListItemIcon>
                                <ListItemText primary="Спільноти" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/messages`}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Email />
                                </ListItemIcon>
                                <ListItemText primary="Повідомлення" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/gallery`}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Photo />
                                </ListItemIcon>
                                <ListItemText primary="Галерея" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/dashboard`}>
                            <ListItemButton>
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