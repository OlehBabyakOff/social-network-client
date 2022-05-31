import React, {useContext, useEffect} from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatList from "../../components/ChatList/ChatList";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";

const Chat = ({socket}) => {

    const {store} = useContext(Context)
    const history = useHistory()

    useEffect(() => {
        if (store.user.roles.isBlocked) {
            history.push('/me')
        }
    }, [])

    return (
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar/>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Sidebar/>
                <ChatList socket={socket}/>
            </Stack>
        </Box>
    );
};

export default Chat;