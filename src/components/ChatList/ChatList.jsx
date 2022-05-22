import React, {useEffect, useState} from 'react';
import {
    Avatar, Box, Button, CircularProgress, Container,
    Divider, Fab,
    Grid, IconButton, Input, InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper, Stack,
    TextField,
    Typography
} from "@mui/material";
import {
    AttachFileOutlined,
    Close,
    DeleteOutlineOutlined,
    LocationOnOutlined,
    Send,
    SentimentSatisfiedAlt
} from "@mui/icons-material";
import ChatMessage from "./ChatMessage";
import {useHistory, useParams} from "react-router-dom";
import {getUser} from "../../api/userService";
import {createConversationService, getMessagesService, sendMessageService} from "../../api/chatService";
import {observer} from "mobx-react-lite";
import Picker from 'emoji-picker-react';

const ChatList = ({socket}) => {

    const {userId} = useParams()
    const history = useHistory()

    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [image, setImage] = useState(null)

    const [height, setHeight] = useState(74.5)
    const [showPicker, setShowPicker] = useState(false);

    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        socket.emit('joinRoom', userId)
        const fetchData = async () => {
            await createConversationService(userId)
            const fetchMessages = await getMessagesService(userId)
            setMessages(fetchMessages.data)
            const fetchUser = await getUser(userId)
            setUser(fetchUser.data)
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

    useEffect( () => {
        socket.on('receiveMessage', msg => {
            setMessages(msg)
        })

        socket.on('locationMessage', msg => {
            setMessages(msg)
        })

    }, [socket])

    const closeChat = async (id) => {
        socket.emit('leaveRoom', id)
        history.push('/messages')
    }

    const sendMessage = async (id) => {
        const fd = new FormData()
        if (message) {
            fd.append('text', message)
        }
        if (image) {
            fd.append('image', image)
        }
        await sendMessageService(id, fd).then(data => {
            socket.emit('sendMessage', [data.data, id])
        })
        setReload(!reload)
        setMessage('')
        setImage(null)
        setShowPicker(false)
        setHeight(74.5)
    }

    const sendLocation = async (id) => {
        if (!navigator.geolocation) {
            return alert('Дана функція недоступна у вашому браузері!')
        }
        navigator.geolocation.getCurrentPosition(async (position) => {
            const message = `https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`
            const fd = new FormData()
            fd.append('text', message)
            await sendMessageService(id, fd).then(data => {
                socket.emit('sendLocation', [data.data, id])
            })
        })
        setReload(!reload)
        setMessage('')
        setImage(null)
        setShowPicker(false)
        setHeight(74.5)
    }

    const onEmojiClick = (event, emojiObject) => {
        setMessage(prevInput => prevInput + emojiObject.emoji)
    };

    return (
        loading ? <CircularProgress/> :
        <Box flex={10} p={{ xs: 0 }}>
            <Grid container component={Paper}>
                <Grid item xs={12}>
                    <List sx={{height: "screen"}}>
                        <Stack direction="row" >
                            <ListItem>
                                <ListItemIcon>
                                    <Avatar src={`data:buffer;base64,${user.avatar}`} />
                                </ListItemIcon>
                                <ListItemText primary={`${user.second_name} ${user.first_name}`}></ListItemText>
                            </ListItem>
                            <ListItem sx={{justifyContent: "end"}}>
                                <IconButton onClick={() => closeChat(userId)} color="primary" component="span">
                                    <Close/>
                                </IconButton>
                            </ListItem>
                        </Stack>
                        <Divider/>
                        <Box sx={{overflowY: "scroll", height: `${height}vh`, mx: 1}}>
                            {messages.messages.map(message => (
                                <ChatMessage message={message} user={user} socket={socket} key={message._id}/>
                            ))}
                        </Box>
                    </List>
                    <Divider />
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={10.5}>
                            <TextField value={message} onChange={e => setMessage(e.target.value)} id="outlined-basic-email" label="Введіть повідомлення..." fullWidth
                                       onKeyPress={e => e.key === 'Enter' && sendMessage(userId)}
                                       InputProps={{
                                           endAdornment: (
                                               <InputAdornment position="end">
                                                   <IconButton size="large" color="primary" onClick={() => {
                                                       setShowPicker(val => !val)
                                                       if (height !== 40) {
                                                           setHeight(40)
                                                       } else {
                                                           setHeight(74.5)
                                                       }
                                                   }}><SentimentSatisfiedAlt/></IconButton>
                                               </InputAdornment>
                                           ),
                                       }}/>
                            {showPicker && <Picker
                                pickerStyle={{ width: '100%' }}
                                onEmojiClick={onEmojiClick} />}
                        </Grid>
                        <Grid xs={1.5} align="center" sx={{marginTop: 0.5}}>
                            <IconButton onClick={() => sendMessage(userId)} size="large" color="primary"><Send/></IconButton>
                            <IconButton onClick={() => sendLocation(userId)} size="large" color="primary"><LocationOnOutlined/></IconButton>
                            <label htmlFor="icon-button-file">
                                <Input onChange={e => setImage(e.target.files[0])} style={{ display: 'none' }} accept="image/*" id="icon-button-file" type="file" />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <AttachFileOutlined/>
                                </IconButton>
                            </label>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default observer(ChatList);