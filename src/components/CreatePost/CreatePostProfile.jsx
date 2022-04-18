import React from 'react';
import {Avatar, Box, Button, ButtonGroup, Paper, Stack, styled, TextField, Typography} from "@mui/material";
import {Image, Room} from "@mui/icons-material";

const CreatePostProfile = () => {
    return (
            <Box
                sx={{width: "80%", mt: 5, ml: 10, height: 280, bgColor: "background.default", color: "text.primary", p:3, borderRadius:"5"}}
            >
                <Paper elevation={2} sx={{p:5, background: "#f9fafb"}}>
                <TextField
                    sx={{ width: "100%" }}
                    id="standard-multiline-static"
                    multiline
                    rows={3}
                    placeholder="Поділіться новинами з друзями"
                    variant="standard"
                />
                <Stack direction="row" gap={1} mt={2} mb={3} sx={{justifyContent: "space-around"}}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="raised" component="span">
                            <Image color="secondary"/>
                        </Button>
                    </label>

                    <Button variant="raised" component="span">
                        <Room color="success" />
                    </Button>

                </Stack>
                <ButtonGroup
                    fullWidth
                    variant="contained"
                    aria-label="outlined primary button group"
                >
                    <Button>Створити</Button>
                </ButtonGroup>
                </Paper>
            </Box>
    );
};

export default CreatePostProfile;