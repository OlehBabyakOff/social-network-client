import * as React from 'react';
import DashboardMain from "../../components/Dashboard/DashboardMain";
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";

const Dashboard = () => {

    const {store} = useContext(Context)
    const history = useHistory()

    useEffect(() => {
        if (store.user.roles.isBlocked) {
            history.push('/me')
        }
    }, [])

    return (
        <DashboardMain/>
    )
}

export default Dashboard;