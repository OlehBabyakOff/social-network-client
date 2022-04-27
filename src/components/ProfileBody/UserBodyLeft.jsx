import React from 'react';
import {
    Box
} from "@mui/material";
import InfoUser from "../InfoProfile/InfoUser";
import GaleryUser from "../GaleryProfile/GaleryUser";
import {observer} from "mobx-react-lite";

const UserBodyLeft = ({user}) => {
    return (
        <Box flex={3} p={{ xs: 0, md: 2 }}>
            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                <InfoUser user={user}/>
                <GaleryUser user={user}/>
            </Box>
        </Box>
    );
};

export default observer(UserBodyLeft);