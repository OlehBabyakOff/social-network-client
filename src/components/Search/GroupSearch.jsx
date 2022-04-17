import React from 'react';
import {IconButton, InputBase, Paper} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";

const GroupSearch = () => {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 900 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Пошук серед спільнот"
            />
            <IconButton sx={{ p: '10px' }}>
                <SearchOutlined/>
            </IconButton>
        </Paper>
    );
};

export default GroupSearch;