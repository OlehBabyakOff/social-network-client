import * as React from 'react';
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";
import {Box} from "@mui/material";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar";
import DashboardStatistics from "../../components/Dashboard/DashboardStatistics";
import DashboardUsers from "../../components/Dashboard/DashboardUsers";
import DashboardGroups from "../../components/Dashboard/DashboardGroups";
import DashboardPosts from "../../components/Dashboard/DashboardPosts";
import DashboardReports from "../../components/Dashboard/DashboardReports";

const Dashboard = ({page}) => {

    const {store} = useContext(Context)
    const history = useHistory()

    useEffect(() => {
        if (store.user.roles.isBlocked) {
            history.push('/me')
        }
    }, [])

    return (
        <Box sx={{ display: 'flex' }}>
            <DashboardSidebar/>
            {page === 'home' ? <DashboardStatistics/> : null}
            {page === 'users' ? <DashboardUsers/> : null}
            {page === 'groups' ? <DashboardGroups/> : null}
            {page === 'posts' ? <DashboardPosts/> : null}
            {page === 'reports' ? <DashboardReports/> : null}
        </Box>
    )
}

export default Dashboard;