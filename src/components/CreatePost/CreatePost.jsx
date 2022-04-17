import React from 'react';
import {Avatar, Box, Button, ButtonGroup, Stack, styled, TextField, Typography} from "@mui/material";
import {Image, Room} from "@mui/icons-material";

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

const CreatePost = () => {
    return (
        <Box
            sx={{width: "60%", ml:26, height: 280, bgColor: "background.default", color: "text.primary", p:3, borderRadius:"5"}}
        >
            <UserBox>
                <Avatar
                    src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    sx={{ width: 50, height: 50 }}
                />
                <Typography fontWeight={500} fontSize={20} variant="span">
                    John Doe
                </Typography>
            </UserBox>
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
        </Box>
    );
};

export default CreatePost;