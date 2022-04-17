import React from 'react';
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Article, Email, Group, Home, Person, Settings} from "@mui/icons-material";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <Box flex={1.5} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
            <Box position="fixed">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="/me">
                                <ListItemIcon>
                                    <Home />
                                </ListItemIcon>
                            <ListItemText primary="Моя сторінка" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="/">
                            <ListItemIcon>
                                <Article />
                            </ListItemIcon>
                            <ListItemText primary="Новини" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="/groups">
                            <ListItemIcon>
                                <Group />
                            </ListItemIcon>
                            <ListItemText primary="Спільноти" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="/messages">
                            <ListItemIcon>
                                <Email />
                            </ListItemIcon>
                            <ListItemText primary="Повідомлення" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="/friends">
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText primary="Друзі" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="/dashboard">
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText primary="Панель адміністратора" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default Sidebar;