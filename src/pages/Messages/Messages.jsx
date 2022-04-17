import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import MessagesList from "../../components/MessagesList/MessagesList";

const Messages = () => {
    return (
        <>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Navbar/>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Sidebar/>
                    <MessagesList/>
                    <Rightbar/>
                </Stack>
            </Box>
        </>
    );
};

export default Messages;