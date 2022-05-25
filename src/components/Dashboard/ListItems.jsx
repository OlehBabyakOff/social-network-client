import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import {Link} from "react-router-dom";
import {Article, Group, Home, Logout, Person, Report} from "@mui/icons-material";

export const mainListItems = (
    <>
        <Link style={{ textDecoration: 'inherit', color: 'inherit'}} to={`/dashboard/home`}>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Панель адміністратора" />
            </ListItemButton>
        </Link>
        <Link style={{ textDecoration: 'inherit', color: 'inherit'}} to={`/dashboard/users`}>
            <ListItemButton>
                <ListItemIcon>
                    <Person />
                </ListItemIcon>
                <ListItemText primary="Користувачі" />
            </ListItemButton>
        </Link>
        <Link style={{ textDecoration: 'inherit', color: 'inherit'}} to={`/dashboard/groups`}>
            <ListItemButton>
                <ListItemIcon>
                    <Group />
                </ListItemIcon>
                <ListItemText primary="Спільноти" />
            </ListItemButton>
        </Link>
        <Link style={{ textDecoration: 'inherit', color: 'inherit'}} to={`/dashboard/posts`}>
            <ListItemButton>
                <ListItemIcon>
                    <Article />
                </ListItemIcon>
                <ListItemText primary="Пости" />
            </ListItemButton>
        </Link>
        <Link style={{ textDecoration: 'inherit', color: 'inherit'}} to={`/dashboard/reports`}>
            <ListItemButton>
                <ListItemIcon>
                    <Report />
                </ListItemIcon>
                <ListItemText primary="Скарги" />
            </ListItemButton>
        </Link>
    </>
);

export const secondaryListItems = (
    <>
        <ListSubheader component="div" inset>
            Налаштування акаунту
        </ListSubheader>
        <Link style={{ textDecoration: 'inherit', color: 'inherit'}} to={`/me`}>
            <ListItemButton>
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText primary="Головна сторінка" />
            </ListItemButton>
        </Link>
    </>
);
