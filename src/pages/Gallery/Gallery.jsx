import React from 'react';
import {Box, Stack} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import GalleryList from "../../components/Gallery/GalleryList";

const Gallery = () => {
    return (
        <>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Navbar/>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Sidebar/>
                    <GalleryList/>
                    <Rightbar/>
                </Stack>
            </Box>
        </>
    );
};

export default Gallery;