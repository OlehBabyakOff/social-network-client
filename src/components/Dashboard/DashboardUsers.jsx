import React, {useEffect, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {
    banService,
    getGroupsService,
    getPostsService,
    getReportsService,
    getUsersService, setAdminService, unbanService
} from "../../api/adminService";
import {Close, Done} from "@mui/icons-material";

const DashboardUsers = () => {

    const [usersData, setUsersData] = useState([])
    const [banUsersData, setBanUsersData] = useState([])

    const [reload, setReload] = useState(true)

    const banUser = async (userId) => {
        await banService(userId)
        setReload(!reload)
    }

    const unbanUser = async (userId) => {
        await unbanService(userId)
        setReload(!reload)
    }

    const setAdmin = async (userId) => {
        await setAdminService(userId)
        setReload(!reload)
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchUsers = await getUsersService()
            let userArr = []
            let banUserArr = []
            fetchUsers.data.map(user => {
                if (!user.roles.isAdmin) {
                    if (!user.roles.isBlocked) {
                        const userDto = {
                            id: user._id,
                            first_name: user.first_name,
                            second_name: user.second_name,
                            username: user.username,
                            email: user.email,
                            phone: user.phone
                        }
                        userArr.push(userDto)
                    } else {
                        const userDto = {
                            id: user._id,
                            first_name: user.first_name,
                            second_name: user.second_name,
                            username: user.username,
                            email: user.email,
                            phone: user.phone
                        }
                        banUserArr.push(userDto)
                    }

                }
            })
            setUsersData(userArr)
            setBanUsersData(banUserArr)
        }
        fetchData()
    }, [reload])

    const columns = [
        { field: 'id', headerName: 'ID', width: 230 },
        { field: 'second_name', headerName: 'Прізвище', width: 120 },
        { field: 'first_name', headerName: 'Ім`я', width: 120 },
        { field: 'username', headerName: 'Логін', width: 120 },
        { field: 'email', headerName: 'Електронна адреса', width: 200 },
        { field: 'phone', headerName: 'Номер телефону', width: 130 },
        { field: "Заблокувати",
            renderCell: (cellValues) => {
                return (
                    <Close
                        variant="contained"
                        color="error"
                        onClick={e => {
                            banUser(cellValues.row.id)
                        }}
                        sx={{cursor: 'pointer', margin: 'auto', width: '50%'}}
                    >
                        Print
                    </Close>
                );
            }, width: 100},
        { field: "Адмінка",
            renderCell: (cellValues) => {
                return (
                    <Done
                        variant="contained"
                        color="success"
                        onClick={e => {
                            setAdmin(cellValues.row.id)
                        }}
                        sx={{cursor: 'pointer', margin: 'auto', width: '50%'}}
                    >
                        Print
                    </Done>
                );
            }, width: 80},
    ];

    const columnsBan = [
        { field: 'id', headerName: 'ID', width: 230 },
        { field: 'second_name', headerName: 'Прізвище', width: 140 },
        { field: 'first_name', headerName: 'Ім`я', width: 140 },
        { field: 'username', headerName: 'Логін', width: 140 },
        { field: 'email', headerName: 'Електронна адреса', width: 200 },
        { field: 'phone', headerName: 'Номер телефону', width: 130 },
        { field: "Розблокувати",
            renderCell: (cellValues) => {
                return (
                    <Done
                        variant="contained"
                        color="success"
                        onClick={e => {
                            unbanUser(cellValues.row.id)
                        }}
                        sx={{cursor: 'pointer', margin: 'auto', width: '50%'}}
                    >
                        Print
                    </Done>
                );
            }, width: 120},
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
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography component="h2" variant="h6" sx={{marginBottom: "10px"}}>
                                Користувачі
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
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography component="h2" variant="h6" sx={{marginBottom: "10px"}}>
                                Заблоковані користувачі
                            </Typography>
                            <div style={{ height: 650, width: '100%' }}>
                                <DataGrid
                                    rows={banUsersData}
                                    columns={columnsBan}
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

export default DashboardUsers;