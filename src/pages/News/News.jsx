import React, {useContext, useEffect, useState} from 'react';
import {Box, Stack} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from '../../components/Feed/Feed'
import Rightbar from "../../components/Rightbar/Rightbar";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Redirect, useHistory} from "react-router-dom";

const News = () => {

    const {store} = useContext(Context)
    const history = useHistory()

    useEffect(() => {
        if (store.user.roles.isBlocked) {
            history.push('/me')
        }
    }, [])

    return (
        <>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Navbar/>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Sidebar/>
                    <Feed/>
                    <Rightbar/>
                </Stack>
            </Box>
        </>
    );
};

export default observer(News);