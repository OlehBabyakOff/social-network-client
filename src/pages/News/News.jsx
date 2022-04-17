import React, {useState} from 'react';
import {Box, Stack} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from '../../components/Feed/Feed'
import Rightbar from "../../components/Rightbar/Rightbar";

const News = () => {

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

export default News;