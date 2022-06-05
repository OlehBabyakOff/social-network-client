import React, {useContext, useEffect, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Moment from "react-moment";
import { DataGrid } from '@mui/x-data-grid';
import {
    getGroupsService,
    getPostsService,
    getReportsService,
    getUsersService,
    unAdminService
} from "../../api/adminService";
import {Close, Done} from "@mui/icons-material";
import {Context} from "../../index";

const DashboardStatistics = () => {

    const {store} = useContext(Context)

    const [usersData, setUsersData] = useState([])
    const [users, setUsers] = useState(0)
    const [groups, setGroups] = useState(0)
    const [posts, setPosts] = useState(0)
    const [reports, setReports] = useState(0)

    const [reload, setReload] = useState(true)

    const unAdmin = async (userId) => {
        await unAdminService(userId)
        setReload(!reload)
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchUsers = await getUsersService()
            setUsers(fetchUsers.data.length)
            let userArr = []
            fetchUsers.data.map(user => {
                if (user.roles.isAdmin) {
                    const userDto = {
                        id: user._id,
                        first_name: user.first_name,
                        second_name: user.second_name,
                        username: user.username,
                        email: user.email,
                        phone: user.phone
                    }
                    userArr.push(userDto)
                }
            })
            setUsersData(userArr)
            const fetchGroups = await getGroupsService()
            setGroups(fetchGroups.data.length)
            const fetchPosts = await getPostsService()
            setPosts(fetchPosts.data.length)
            const fetchReports = await getReportsService()
            setReports(fetchReports.data.length)
        }
        fetchData()
    }, [reload])

    const columns = [
        { field: 'id', headerName: 'ID', width: 230 },
        { field: 'second_name', headerName: 'Прізвище', width: 140 },
        { field: 'first_name', headerName: 'Ім`я', width: 140 },
        { field: 'username', headerName: 'Логін', width: 140 },
        { field: 'email', headerName: 'Електронна адреса', width: 200 },
        { field: 'phone', headerName: 'Номер телефону', width: 150 },
        { field: "Зняти",
            renderCell: (cellValues) => {
                if (cellValues.row.id !== store.user._id) {
                    return (
                        <Close
                            variant="contained"
                            color="error"
                            onClick={e => {
                                unAdmin(cellValues.row.id)
                            }}
                            sx={{cursor: 'pointer', margin: 'auto', width: '50%'}}
                        >
                            Print
                        </Close>
                    );
                }
            }, width: 100},
    ];

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Typography component="h2" variant="h6">
                                Зареєстровані користувачі
                            </Typography>
                            <Typography component="p" variant="h5" sx={{marginTop: "10px"}}>
                                {users} користувачів
                            </Typography>
                            <Typography color="text.secondary" sx={{ flex: 1 }}>
                                на <Moment format='DD MM YYYY'>{Date.now()}</Moment>
                            </Typography>
                            <div>
                                Список користувачів
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Typography component="h2" variant="h6">
                                Спільноти
                            </Typography>
                            <Typography component="p" variant="h5" sx={{marginTop: "10px"}}>
                                {groups} спільнот
                            </Typography>
                            <Typography color="text.secondary" sx={{ flex: 1 }}>
                                на <Moment format='DD MM YYYY'>{Date.now()}</Moment>
                            </Typography>
                            <div>
                                Список спільнот
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Typography component="h2" variant="h6">
                                Кількість постів
                            </Typography>
                            <Typography component="p" variant="h5" sx={{marginTop: "10px"}}>
                                {posts} постів
                            </Typography>
                            <Typography color="text.secondary" sx={{ flex: 1 }}>
                                на <Moment format='DD MM YYYY'>{Date.now()}</Moment>
                            </Typography>
                            <div>
                                Список постів
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Typography component="h2" variant="h6">
                                Кількість скарг
                            </Typography>
                            <Typography component="p" variant="h5" sx={{marginTop: "10px"}}>
                                {reports} скарг
                            </Typography>
                            <Typography color="text.secondary" sx={{ flex: 1 }}>
                                на <Moment format='DD MM YYYY'>{Date.now()}</Moment>
                            </Typography>
                            <div>
                                Список скарг
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography component="h2" variant="h6" sx={{marginBottom: "10px"}}>
                                Адміністратори
                            </Typography>
                            <div style={{ height: 650, width: '100%' }}>
                                <DataGrid
                                    rows={usersData}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default DashboardStatistics;