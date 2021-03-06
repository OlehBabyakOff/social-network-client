import React, {useContext, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    ButtonGroup, IconButton,
    InputAdornment,
    Paper,
    Stack,
    styled,
    TextField,
    Typography
} from "@mui/material";
import {CheckCircleOutline, Image, Room, SentimentSatisfiedAlt} from "@mui/icons-material";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import {createPostService} from "../../api/postService";
import Picker from "emoji-picker-react";

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
    const [doneImage, setDoneImage] = useState(false)
    const [doneLocation, setDoneLocation] = useState(false)

    const [margin, setMargin] = useState(10)
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setText(prevInput => prevInput + emojiObject.emoji)
    };

    const createPost = async (text, image, location) => {
        if (store.user.roles.isActivated) {
            if (text.trim()) {
                const data = new FormData()
                data.append('text', text)
                if (image) data.append('image', image)
                if (location) data.append('location', location)
                await createPostService(data)
                setReload(!reload)
                setText("")
                setImage(null)
                setLocation(null)
                setDoneImage(false)
                setDoneLocation(false)
                setShowPicker(false)
                setMargin(10)
            } else {
                store.clearErrors()
                store.setErrors('Ви не можете створювати порожній пост!')
            }
        } else {
            store.clearErrors()
            store.setErrors('Ви не можете створювати пости, поки не підтвердите свій акаунт за посиланням на пошті!')
            setText("")
            setImage(null)
            setLocation(null)
            setDoneImage(false)
            setDoneLocation(false)
            setShowPicker(false)
            setMargin(10)
        }

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
            sx={{width: "70%", ml:20, mb: margin, height: 250, bgColor: "background.default", color: "text.primary", p:3, borderRadius:"5"}}
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
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton size="large" color="primary" onClick={() => {
                                    setShowPicker(val => !val)
                                    if (margin !== 10) {
                                        setMargin(10)
                                    } else {
                                        setMargin(50)
                                    }
                                }}><SentimentSatisfiedAlt/></IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {showPicker && <Picker
                    pickerStyle={{ width: '100%' }}
                    onEmojiClick={onEmojiClick} />}
                <Stack direction="row" gap={2} mt={3} mb={3} sx={{justifyContent: "space-around"}}>
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

                    {doneLocation ?
                        <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span">
                                <CheckCircleOutline color={"success"}/>
                            </Button>
                        </label>
                        :
                        <Button onClick={() => {
                            sendLocation()
                            setDoneLocation(true)
                        }} variant="raised" component="span">
                            <Room color="success" />
                        </Button>
                    }

                    {doneImage ?
                        <>
                            <input
                                accept="image/*"
                                style={{display: 'none'}}
                                id="raised-button-file"
                                type="file"
                                onChange={e => {
                                    setImage(e.target.files[0])
                                    setDoneImage(true)
                                }}
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="raised" component="span">
                                    <CheckCircleOutline color={"secondary"}/>
                                </Button>
                            </label>
                        </>
                        :
                        <>
                            <input
                                accept="image/*"
                                style={{display: 'none'}}
                                id="raised-button-file"
                                type="file"
                                onChange={e => {
                                    setImage(e.target.files[0])
                                    setDoneImage(true)
                                }}
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="raised" component="span">
                                    <Image color="secondary"/>
                                </Button>
                            </label>
                        </>
                    }

                </Stack>
            </Paper>
        </Box>
    );
};

export default observer(CreatePost);