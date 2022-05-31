import React, {useContext, useEffect} from 'react';
import {Box, Stack} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import GalleryList from "../../components/Gallery/GalleryList";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";

const Gallery = () => {

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
                    <GalleryList/>
                    <Rightbar/>
                </Stack>
            </Box>
        </>
    );
};

export default Gallery;