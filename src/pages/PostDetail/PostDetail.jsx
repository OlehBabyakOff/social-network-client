import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {Box, Stack} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import PostInfo from "../../components/Post/PostInfo";

const PostDetail = () => {
    return (
        <>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Navbar/>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Sidebar/>
                        <PostInfo/>
                    <Rightbar/>
                </Stack>
            </Box>
        </>
    );
};

export default PostDetail;