import React from 'react';
import {IconButton, InputBase, Paper} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";

const GroupMembersSearch = () => {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 460 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Пошук серед учасників"
            />
            <IconButton sx={{ p: '10px' }}>
                <SearchOutlined/>
            </IconButton>
        </Paper>
    );
};

export default GroupMembersSearch;