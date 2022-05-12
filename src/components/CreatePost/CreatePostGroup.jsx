import React, {useState} from 'react';
import {Box, Button, ButtonGroup, Paper, Stack, TextField} from "@mui/material";
import {Image, Room} from "@mui/icons-material";
import {createPostService} from "../../api/postService";
import {createGroupPostService} from "../../api/groupService";
import {observer} from "mobx-react-lite";

const CreatePostGroup = ({groupId, reload, setReload}) => {

    const [text, setText] = useState("")
    const [image, setImage] = useState(null)
    const [location, setLocation] = useState(null)

    const createPost = async (text, image) => {
        const data = new FormData()
        data.append('text', text)
        if (image) data.append('image', image)
        if (location) data.append('location', location)
        await createGroupPostService(groupId, data)
        setReload(!reload)
        setText("")
        setImage(null)
        setLocation(null)
    }

    const sendLocation = async () => {
        if (!navigator.geolocation) {
            return alert('Дана функція недоступна у вашому браузері!')
        }
        navigator.geolocation.getCurrentPosition(async (position) => {
            const message = `https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`
            setLocation(message)
        })
    }

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

                    <Button onClick={() => sendLocation()} variant="raised" component="span">
                        <Room color="success" />
                    </Button>

                </Stack>
                <ButtonGroup
                    fullWidth
                    variant="contained"
                    aria-label="outlined primary button group"
                >
                    <Button onClick={() => createPost(text, image, location)}>Створити</Button>
                </ButtonGroup>
                </Paper>
            </Box>
    );
};

export default observer(CreatePostGroup);