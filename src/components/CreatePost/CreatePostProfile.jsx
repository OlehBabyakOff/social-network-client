import React, {useContext, useState} from 'react';
import {Avatar, Box, Button, ButtonGroup, Paper, Stack, styled, TextField, Typography} from "@mui/material";
import {Image, Room} from "@mui/icons-material";
import {Context} from "../../index.js";
import {createPostService} from "../../api/postService";
import {observer} from "mobx-react-lite";

const CreatePostProfile = ({reload, setReload}) => {

    const {store} = useContext(Context)

    const [text, setText] = useState("")
    const [image, setImage] = useState(null)

    const createPost = async (text, image) => {
        const data = new FormData()
        data.append('text', text)
        if (image) data.append('image', image)
        await createPostService(data)
        setReload(!reload)
        setText("")
        setImage(null)
    }

    return (
            <Box
                sx={{width: "80%", mt: 5, ml: 14, height: 280, bgColor: "background.default", color: "text.primary", p:3, borderRadius:"5"}}
            >
                <Paper elevation={2} sx={{p:5, background: "#f9fafb"}}>
                <TextField
                    sx={{ width: "100%" }}
                    id="standard-multiline-static"
                    multiline
                    rows={3}
                    placeholder="Поділіться новинами з друзями"
                    variant="standard"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <Stack direction="row" gap={1} mt={2} mb={3} sx={{justifyContent: "space-around"}}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={e => setImage(e.target.files[0])}
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
                    <Button onClick={() => createPost(text, image)}>Створити</Button>
                </ButtonGroup>
                </Paper>
            </Box>
    );
};

export default observer(CreatePostProfile);