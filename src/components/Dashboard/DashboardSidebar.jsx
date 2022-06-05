import React, {useContext, useState} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {Link, useHistory} from "react-router-dom";
import {Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {mainListItems, secondaryListItems} from "./ListItems";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {AdminPanelSettingsOutlined, Home, Logout, Settings} from "@mui/icons-material";
import DrawerRight from '@mui/material/Drawer';

const drawerWidth = 260;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const DashboardSidebar = () => {

    const {store} = useContext(Context)
    const history = useHistory()

    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [openRight, setOpenRight] = useState(false);

    const logout = async () => {
        await store.logout()
        history.push("/login")
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px',
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Панель адміністратора
                    </Typography>
                    <IconButton color="inherit">
                        <Avatar onClick={() => setOpenRight(!openRight)}
                                sx={{ width: 30, height: 30 }}
                                src={`data:buffer;base64,${store.user.avatar}`}
                        />
                    </IconButton>
                    <DrawerRight
                        anchor={'right'}
                        open={openRight}
                        onClose={() => setOpenRight(false)}
                    >
                        <List sx={{mt: 8}}>
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
                    </DrawerRight>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {mainListItems}
                    <Divider sx={{ my: 1 }} />
                    {secondaryListItems}
                </List>
            </Drawer>
        </>
    );
};

export default observer(DashboardSidebar);