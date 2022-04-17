import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Profile from "../../components/Profile/Profile";

const Homepage = () => {
    return (
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar/>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Sidebar/>
                <Profile/>
            </Stack>
        </Box>
    );
};

export default Homepage;