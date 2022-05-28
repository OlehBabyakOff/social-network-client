import React, {useContext, useEffect, useState} from 'react';
import {
    AppBar, Autocomplete,
    Avatar,
    Badge,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem,
    styled, TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {
    AccountCircle,
    AdminPanelSettingsOutlined,
    Group,
    Home,
    Logout,
    Mail,
    Menu,
    Settings
} from "@mui/icons-material";
import {Link, NavLink, useHistory} from "react-router-dom";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";

const StyledToolBar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const Icons = styled(Box)(({theme}) => ({
    display: "none",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up('sm')]:{
        display: "flex"
    }
}))

const UserBox = styled(Box)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up('sm')]:{
        display: "none"
    }
}))

const Navbar = () => {

    const {store} = useContext(Context)

    const history = useHistory();

    const [open, setOpen] = useState(false)

    const logout = async () => {
        await store.logout()
        history.push("/login")
    }

    return (
        <AppBar position="sticky">
            <StyledToolBar>
                <NavLink to="/me" style={{textDecoration: "none", color: "white"}}>
                    <Typography
                        variant="h5"
                        noWrap
                        component="h5"
                        sx={{ display: { xs: 'none', sm: 'block', fontWeight: 500, cursor: "pointer" } }}
                    >
                        Social Network
                    </Typography>
                </NavLink>

                <Box sx={{ flexGrow: 1 }} />
                <Icons sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <NavLink to="/messages" style={{textDecoration: "none", color: "white"}}>
                        <IconButton size="large" color="inherit">
                            <Badge badgeContent={1} color="error">
                                <Mail />
                            </Badge>
                        </IconButton>
                    </NavLink>
                    <NavLink to="/friends" style={{textDecoration: "none", color: "white"}}>
                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <Badge badgeContent={1} color="error">
                                <Group />
                            </Badge>
                        </IconButton>
                    </NavLink>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Avatar onClick={() => setOpen(true)}
                        sx={{ width: 30, height: 30 }}
                        src={`data:buffer;base64,${store.user.avatar}`}
                        />
                    </IconButton>
                    <Drawer anchor="right"
                            open={open}
                            onClose={() => setOpen(false)}
                    >
                        <List>
                            <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/me`}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText primary="Моя сторінка" />
                                </ListItemButton>
                            </Link>
                            <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/settings`}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText primary="Налаштування" />
                                </ListItemButton>
                            </Link>
                            {store.user.roles.isAdmin ? <ListItem disablePadding>
                                <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 300 }} to={`/dashboard/home`}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <AdminPanelSettingsOutlined />
                                        </ListItemIcon>
                                        <ListItemText primary="Панель адміністратора" />
                                    </ListItemButton>
                                </Link>
                            </ListItem> : null}
                            <ListItemButton onClick={() => logout()}>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText primary="Вихід" />
                            </ListItemButton>
                        </List>
                    </Drawer>
                </Icons>
                <UserBox>
                    <Avatar onClick={() => setOpen(true)}
                            sx={{ width: 30, height: 30 }}
                            src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="h5"
                    >
                        Oleh
                    </Typography>
                </UserBox>
            </StyledToolBar>
        </AppBar>
    );
};

export default observer(Navbar);