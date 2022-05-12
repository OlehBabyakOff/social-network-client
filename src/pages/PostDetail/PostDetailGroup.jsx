import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import PostInfoGroup from "../../components/Post/PostInfoGroup";

const PostDetailGroup = () => {
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