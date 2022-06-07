import React, {useContext, useState} from 'react';
import {Box, Button, ButtonGroup, IconButton, InputAdornment, Paper, Stack, TextField} from "@mui/material";
import {CheckCircleOutline, Image, Room, SentimentSatisfiedAlt} from "@mui/icons-material";
import {createGroupPostService} from "../../api/groupService";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Picker from "emoji-picker-react";

const CreatePostGroup = ({groupId, reload, setReload}) => {

    const {store} = useContext(Context)

    const [text, setText] = useState("")
    const [image, setImage] = useState(null)
    const [location, setLocation] = useState(null)
    const [doneImage, setDoneImage] = useState(false)
    const [doneLocation, setDoneLocation] = useState(false)

    const [margin, setMargin] = useState(2)
    const [height, setHeight] = useState(220)
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setText(prevInput => prevInput + emojiObject.emoji)
    };

    const createPost = async (text, image) => {
        if (store.user.roles.isActivated) {
            if (text.trim()) {
                const data = new FormData()
                data.append('text', text)
                if (image) data.append('image', image)
                if (location) data.append('location', location)
                await createGroupPostService(groupId, data)
                setReload(!reload)
                setText("")
                setImage(null)
                setLocation(null)
                setDoneImage(false)
                setDoneLocation(false)
                setShowPicker(false)
                setMargin(2)
                setHeight(220)
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
            setMargin(2)
            setHeight(220)
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
                sx={{width: "80%", ml: 12, mb: margin, height: height, bgColor: "background.default", color: "text.primary", p:3, borderRadius:"5"}}
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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton size="large" color="primary" onClick={() => {
                                        setShowPicker(val => !val)
                                        if (margin !== 2 && height !== 220) {
                                            setMargin(2)
                                            setHeight(220)
                                        } else {
                                            setMargin(40)
                                            setHeight(250)
                                        }
                                    }}><SentimentSatisfiedAlt/></IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {showPicker && <Picker
                        pickerStyle={{ width: '100%' }}
                        onEmojiClick={onEmojiClick} />}
                <Stack direction="row" gap={2} mt={2} mb={3} sx={{justifyContent: "space-around"}}>

                    <ButtonGroup
                        fullWidth
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={() => createPost(text, image, location)}>Створити</Button>
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

export default observer(CreatePostGroup);