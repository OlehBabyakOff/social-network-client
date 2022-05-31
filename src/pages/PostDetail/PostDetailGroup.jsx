import React, {useContext, useEffect} from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import PostInfoGroup from "../../components/Post/PostInfoGroup";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";

const PostDetailGroup = () => {

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
                        <PostInfoGroup/>
                    <Rightbar/>
                </Stack>
            </Box>
        </>
    );
};

export default PostDetailGroup;