import React from 'react';
import {
    Box
} from "@mui/material";
import GaleryProfile from "../GaleryProfile/GaleryProfile";
import InfoProfile from "../InfoProfile/InfoProfile";
import {observer} from "mobx-react-lite";

const ProfileBodyLeft = () => {
    return (
        <Box flex={3} p={{ xs: 0, md: 2 }}>
            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                <InfoProfile/>
                <GaleryProfile/>
            </Box>
        </Box>
    );
};

export default observer(ProfileBodyLeft);