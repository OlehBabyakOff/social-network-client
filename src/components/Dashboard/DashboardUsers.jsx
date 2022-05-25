import React, {useEffect, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {getGroupsService, getPostsService, getReportsService, getUsersService} from "../../api/adminService";

const DashboardUsers = () => {

    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchUsers = await getUsersService()
            let userArr = []
            fetchUsers.data.map(user => {
                const userDto = {
                    id: user._id,
                    first_name: user.first_name,
                    second_name: user.second_name,
                    username: user.username,
                    email: user.email,
                    phone: user.phone
                }
                userArr.push(userDto)
            })
            setUsersData(userArr)
        }
        fetchData()
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 230 },
        { field: 'second_name', headerName: 'Прізвище', width: 150 },
        { field: 'first_name', headerName: 'Ім`я', width: 150 },
        { field: 'username', headerName: 'Логін', width: 150 },
        { field: 'email', headerName: 'Електронна адреса', width: 200 },
        { field: 'phone', headerName: 'Номер телефону', width: 180 }
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
                            <div style={{ height: 400, width: '100%' }}>
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

export default DashboardUsers;