import React from 'react';
import {Avatar, Box, Button, ButtonGroup, Paper, Stack, TextField, Typography} from "@mui/material";

const CreateComment = () => {
    return (
        <Paper elevation={0} sx={{p:"40px 20px", background: "#f9fafb", width: "95%", marginBottom: 5}}>
            <TextField
                sx={{ width: "100%" }}
                id="standard-multiline-static"
                multiline
                rows={3}
                placeholder="Прокоментувати новину"
                variant="standard"
            />
            <ButtonGroup
                fullWidth
                variant="contained"
                aria-label="outlined primary button group"
                sx={{mt: 2}}
            >
                <Button>Додати</Button>
            </ButtonGroup>
        </Paper>
    );
};

export default CreateComment;