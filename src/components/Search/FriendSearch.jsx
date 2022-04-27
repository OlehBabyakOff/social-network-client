import React, {useState} from 'react';
import {IconButton, InputBase, Paper} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";

const FriendSearch = ({followers, users}) => {

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 900 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Пошук серед друзів"
            />
            <IconButton sx={{ p: '10px' }}>
                <SearchOutlined/>
            </IconButton>
        </Paper>
    );
};

export default FriendSearch;