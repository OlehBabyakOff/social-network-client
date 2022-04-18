import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import GroupChatList from "../../components/ChatList/GroupChatList";

const GroupChat = () => {
    return (
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar/>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Sidebar/>
                <GroupChatList/>
            </Stack>
        </Box>
    );
};

export default GroupChat;