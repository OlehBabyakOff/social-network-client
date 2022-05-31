import React, {useContext, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {mainListItems, secondaryListItems} from "./ListItems";
import {Avatar, CircularProgress} from "@mui/material";
import {Context} from "../../index";
import {BrowserRouter as Router, Redirect, Route, Switch, Link, useHistory} from "react-router-dom";
import DashboardStatistics from "./DashboardStatistics";
import DashboardUsers from "./DashboardUsers";
import DashboardGroups from "./DashboardGroups";
import DashboardPosts from "./DashboardPosts";
import DashboardReports from "./DashboardReports";

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

const DashboardMain = () => {

    const {store} = useContext(Context)

    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        } else {
            store.setLoading(false)
        }
    }, [])

    return (
        <Box sx={{ display: 'flex' }}>
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
                    <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`/me`}>
                        <IconButton color="inherit">
                            <Avatar sx={{ width: 30, height: 30 }}
                                    src={`data:buffer;base64,${store.user.avatar}`}
                            />
                        </IconButton>
                    </Link>
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
            <Router>
                <Switch>
                    <Route exact path='/dashboard/home'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                            store.user && store.user.roles.isAdmin ?  <DashboardStatistics/> : <Redirect to='/me'/>}
                    </Route>
                    <Route exact path='/dashboard/users'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                            store.user && store.user.roles.isAdmin ?  <DashboardUsers/> : <Redirect to='/me'/>}
                    </Route>
                    <Route exact path='/dashboard/groups'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                            store.user && store.user.roles.isAdmin ?  <DashboardGroups/> : <Redirect to='/me'/>}
                    </Route>
                    <Route exact path='/dashboard/posts'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                            store.user && store.user.roles.isAdmin ?  <DashboardPosts/> : <Redirect to='/me'/>}
                    </Route>
                    <Route exact path='/dashboard/reports'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                            store.user && store.user.roles.isAdmin ?  <DashboardReports/> : <Redirect to='/me'/>}
                    </Route>
                    <Route exact path='/*'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                            store.user && store.user.roles.isAdmin ?  <Redirect to='/dashboard/home'/> : <Redirect to='/me'/>}
                    </Route>
                </Switch>
            </Router>
        </Box>
    );
};

export default DashboardMain;