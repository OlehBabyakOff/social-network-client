import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserProfile from "../../components/Profile/UserProfile";

const User = () => {
    return (
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar/>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Sidebar/>
                <UserProfile/>
            </Stack>
        </Box>
    );
};

export default User;