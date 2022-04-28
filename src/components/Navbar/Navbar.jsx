import React, {useContext, useState} from 'react';
import {
    AppBar, Autocomplete,
    Avatar,
    Badge,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem, ListItemText, MenuItem,
    styled, TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {AccountCircle, Group, Home, Logout, Mail, Menu, Settings} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
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

    const [open, setOpen] = useState(false)

    const logout = async () => {
        await store.logout()
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
                            <NavLink to="/me" style={{textDecoration: "none", color: "black"}}>
                                <ListItem>
                                    <MenuItem>
                                        <Home sx={{mr: 2}}/>
                                        Моя сторінка</MenuItem>
                                </ListItem>
                            </NavLink>
                            <NavLink to="/dashboard" style={{textDecoration: "none", color: "black"}}>
                                <ListItem>
                                    <MenuItem>
                                        <Settings sx={{mr:2}}/>
                                        Панель адміністратора</MenuItem>
                                </ListItem>
                            </NavLink>
                            <ListItem>
                                <MenuItem onClick={() => logout()} sx={{ml:0.5}}>
                                    <Logout sx={{mr:2}}/>
                                    Вихід</MenuItem>
                            </ListItem>
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