import React, {useContext, useState} from 'react';
import {Avatar, Box, Button, ButtonGroup, Paper, Stack, styled, TextField, Typography} from "@mui/material";
import {Image, Room} from "@mui/icons-material";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import {createPostService} from "../../api/postService";

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

const CreatePost = ({reload, setReload}) => {

    const {store} = useContext(Context)

    const [text, setText] = useState("")
    const [image, setImage] = useState(null)
    const [location, setLocation] = useState(null)

    const createPost = async (text, image, location) => {
        const data = new FormData()
        data.append('text', text)
        if (image) data.append('image', image)
        if (location) data.append('location', location)
        await createPostService(data)
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
            const message = `https://google.com/maps?q=${position.coords.longitude},${position.coords.latitude}`
            setLocation(message)
        })
    }

    return (
        <Box
            sx={{width: "70%", ml:20, mb: 10, height: 280, bgColor: "background.default", color: "text.primary", p:3, borderRadius:"5"}}
        >
            <Paper elevation={2} sx={{p:5, background: "#f9fafb"}}>
                <UserBox>
                    <Avatar
                        src={`data:buffer;base64,${store.user.avatar}`}
                        sx={{ width: 50, height: 50 }}
                    />
                    <Stack direction="column">
                        <Typography fontWeight={500} fontSize={20} variant="span">
                            {`${store.user.second_name} ${store.user.first_name}`}
                        </Typography>
                        <Typography fontWeight={300} fontSize={18} variant="span">
                            @{store.user.username}
                        </Typography>
                    </Stack>
                </UserBox>
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
                    <Button onClick={(e) => {
                        e.preventDefault()
                        createPost(text, image, location)
                    }}>Створити</Button>
                </ButtonGroup>
            </Paper>
        </Box>
    );
};

export default observer(CreatePost);