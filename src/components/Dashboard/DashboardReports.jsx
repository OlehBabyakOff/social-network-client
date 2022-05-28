import React, {useEffect, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {allowBanService, denyBanService, getReportsService, getUsersService} from "../../api/adminService";
import {Close, Done} from "@mui/icons-material";

const DashboardReports = () => {

    const [reports, setReports] = useState([])
    const [reload, setReload] = useState(true)

    const allowBan = async (reporter, accused) => {
        await allowBanService(reporter, accused)
        setReload(!reload)
    }

    const denyBan = async (reporter, accused) => {
        await denyBanService(reporter, accused)
        setReload(!reload)
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchReports = await getReportsService()
            const fetchUsers = await getUsersService()
            let reportsArr = []
            fetchReports.data.map(report => {
                const reporter = fetchUsers.data.find(user => user._id === report.reporterId)
                const accused = fetchUsers.data.find(user => user._id === report.accusedId)
                const reportDto = {
                    id: report._id,
                    reporter: `${reporter.second_name} ${reporter.first_name}`,
                    accused: `${accused.second_name} ${accused.first_name}`,
                    reporterId: report.reporterId,
                    accusedId: report.accusedId,
                    violation: report.violation,
                    date: new Date(report.reportedAt).toLocaleDateString("uk-UA", {hour: 'numeric', minute: 'numeric'})
                }
                reportsArr.push(reportDto)
            })
            setReports(reportsArr)
        }
        fetchData()
    }, [reload])

    const columns = [
        { field: 'id', headerName: 'ID', width: 230 },
        { field: 'reporter', headerName: 'Подав скаргу', width: 150 },
        { field: 'accused', headerName: 'Підозрюваний', width: 150 },
        { field: 'violation', headerName: 'Причина', width: 200 },
        { field: 'date', headerName: 'Дата подачі', width: 145 },
        { field: "Задовольнити",
            renderCell: (cellValues) => {
                return (
                    <Done
                        variant="contained"
                        color="success"
                        onClick={e => {
                            allowBan(cellValues.row.reporterId, cellValues.row.accusedId)
                        }}
                        sx={{cursor: 'pointer', margin: 'auto', width: '50%'}}
                    >
                        Print
                    </Done>
                );
            }, width: 130},
        { field: "Відмовити",
            renderCell: (cellValues) => {
                return (
                    <Close
                        variant="contained"
                        color="error"
                        onClick={e => {
                            denyBan(cellValues.row.reporterId, cellValues.row.accusedId)
                        }}
                        sx={{cursor: 'pointer', margin: 'auto', width: '50%'}}
                    >
                        Print
                    </Close>
                );
            }, width: 100}
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
                                Скарги
                            </Typography>
                            <div style={{ height: 650, width: '100%' }}>
                                <DataGrid
                                    rows={reports}
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

export default DashboardReports;