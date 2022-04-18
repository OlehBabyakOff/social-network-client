import React from 'react';
import {Button, ButtonGroup, Paper, TextField} from "@mui/material";

const CreateReplyComment = () => {
    return (
        <Paper elevation={0} sx={{p:"40px 20px", background: "#f9fafb", width: "95%"}}>
            <TextField
                sx={{ width: "100%" }}
                id="standard-multiline-static"
                multiline
                rows={3}
                placeholder="Відповісти на комантар"
                variant="standard"
            />
            <ButtonGroup
                fullWidth
                variant="contained"
                aria-label="outlined primary button group"
                sx={{mt: 2}}
            >
                <Button>Відповісти</Button>
            </ButtonGroup>
        </Paper>
    );
};

export default CreateReplyComment;