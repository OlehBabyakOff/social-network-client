import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
   Paper,
    Typography
} from "@mui/material";
import GroupMembersList from "../GroupMembersList/GroupMembersList";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const GroupMembers = ({members}) => {

    const {store} = useContext(Context)

    return (
        <Box flex={3} p={{ xs: 0, md: 2 }}>
            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', marginTop: 3 }}>
                <Paper elevation={3} sx={{p:2, background: "#f9fafb"}}>
                    <Typography variant="h6" fontWeight={300} mt={2} mb={2}>
                        Учасники спільноти
                    </Typography>

                    {members.length > 0 ? members.map(member => (
                        <GroupMembersList member={member}/>
                    )) : null}

                </Paper>
            </Box>
        </Box>
    );
};

export default observer(GroupMembers);