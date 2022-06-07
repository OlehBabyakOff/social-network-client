import React, {useContext, useEffect, useRef, useState} from 'react';
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
    AttachFileOutlined, CheckCircleOutline,
    Close,
    DeleteOutlineOutlined,
    LocationOnOutlined, Room,
    Send,
    SentimentSatisfiedAlt
} from "@mui/icons-material";
import ChatMessage from "./ChatMessage";
import {useHistory, useParams} from "react-router-dom";
import {getUser} from "../../api/userService";
import {
    createConversationService,
    getConversationService,
    getMessagesService, getOneConversationService,
    sendMessageService
} from "../../api/chatService";
import {observer} from "mobx-react-lite";
import Picker from 'emoji-picker-react';
import {Context} from "../../index";
import {Alert} from "@mui/lab";
import AlertMain from "../Alert/Alert";

const ChatList = ({socket}) => {

    const {store} = useContext(Context)
    const {conversationId} = useParams()
    const history = useHistory()

    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [image, setImage] = useState(null)

    const [height, setHeight] = useState(74.5)
    const [showPicker, setShowPicker] = useState(false);

    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const [doneImage, setDoneImage] = useState(false)

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        socket.emit('joinRoom', conversationId)
        const fetchData = async () => {
            const fetchMessages = await getMessagesService(conversationId)
            setMessages(fetchMessages.data)

            const fetchConversations = await getOneConversationService(conversationId)

            const fetchUser = await getUser(fetchConversations.data.participant1 === store.user._id ? fetchConversations.data.participant2 : fetchConversations.data.participant1)
            setUser(fetchUser.data)
        }
        fetchData().then(() => {
            setLoading(false)
            scrollToBottom()
        })
    }, [reload])

    useEffect( () => {
        socket.on('receiveMessage', msg => {
            setMessages([...messages, msg])
            scrollToBottom()
        })

        socket.on('locationMessage', msg => {
            setMessages([...messages, msg])
            scrollToBottom()
        })

    })

    const closeChat = async (id) => {
        socket.emit('leaveRoom', id)
        history.push('/messages')
    }

    const sendMessage = async (id) => {
        if (store.user.roles.isActivated) {
            if (!user.roles.isBlocked) {
                const fd = new FormData()
                if (message) {
                    fd.append('text', message)
                }
                if (image) {
                    fd.append('image', image)
                }
                await sendMessageService(id, fd).then(data => {
                    socket.emit('sendMessage', data.data)
                    setReload(!reload)
                    setMessage('')
                    setImage(null)
                    setDoneImage(false)
                    setShowPicker(false)
                    setHeight(74.5)
                })
            } else {
                store.clearErrors()
                store.setErrors('Ви не можете відправляти повідомлення заблокованим користувачам!')
                setMessage('')
                setDoneImage(false)
                setImage(null)
                setShowPicker(false)
                setHeight(74.5)
            }

        } else {
            store.clearErrors()
            store.setErrors('Ви не можете відправляти повідомлення користувачам, поки не підтвердите свій акаунт за посиланням на пошті!')
            setMessage('')
            setDoneImage(false)
            setImage(null)
            setShowPicker(false)
            setHeight(74.5)
        }
    }

    const sendLocation = async (id) => {
        if (store.user.roles.isActivated) {
            if (!user.roles.isBlocked) {
                if (!navigator.geolocation) {
                    return alert('Дана функція недоступна у вашому браузері!')
                }
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const message = `https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`
                    const fd = new FormData()
                    fd.append('text', message)
                    await sendMessageService(id, fd).then(data => {
                        socket.emit('sendLocation', data.data)
                        setReload(!reload)
                        setMessage('')
                        setImage(null)
                        setDoneImage(false)
                        setShowPicker(false)
                        setHeight(74.5)
                    })
                })
            } else {
                store.clearErrors()
                store.setErrors('Ви не можете відправляти повідомлення заблокованим користувачам!')
                setMessage('')
                setImage(null)
                setDoneImage(false)
                setShowPicker(false)
                setHeight(74.5)
            }

        } else {
            store.clearErrors()
            store.setErrors('Ви не можете відправляти повідомлення користувачам, поки не підтвердите свій акаунт за посиланням на пошті!')
            setMessage('')
            setImage(null)
            setDoneImage(false)
            setShowPicker(false)
            setHeight(74.5)
        }
    }

    const onEmojiClick = (event, emojiObject) => {
        setMessage(prevInput => prevInput + emojiObject.emoji)
    };

    return (
        loading ? <CircularProgress sx={{position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'}}/> :
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
                                <IconButton onClick={() => closeChat(conversationId)} color="primary" component="span">
                                    <Close/>
                                </IconButton>
                            </ListItem>
                        </Stack>
                        {store.errors.length > 0 ? <AlertMain width={'98%'} position={'absolute'}/> : null}
                        {user.roles.isBlocked ?
                        <Alert severity="error" sx={{width: '98%', position: 'absolute'}}>Користувач {`${user.second_name} ${user.first_name}`} - заблокований</Alert>
                            : null}
                        <Divider/>
                        <Box sx={{overflowY: "auto", height: `${height}vh`, mx: 1}}>
                            {messages.map(message => (
                                <ChatMessage message={message} user={user} socket={socket} key={message._id}/>
                            ))}
                            <div ref={messagesEndRef} />
                        </Box>
                    </List>
                    <Divider />
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={10.5}>
                            <TextField value={message} onChange={e => setMessage(e.target.value)} id="outlined-basic-email" label="Введіть повідомлення..." fullWidth
                                       onKeyPress={e => e.key === 'Enter' && sendMessage(conversationId)}
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
                            {user.roles.isBlocked ?
                                <>
                                    <IconButton disabled onClick={() => sendMessage(conversationId)} size="large" color="primary"><Send/></IconButton>
                                    <IconButton disabled onClick={() => sendLocation(conversationId)} size="large" color="primary"><LocationOnOutlined/></IconButton>
                                    <label htmlFor="icon-button-file">
                                        <Input disabled onChange={e => setImage(e.target.files[0])} style={{ display: 'none' }} accept="image/*" id="icon-button-file" type="file" />
                                        <IconButton disabled color="primary" aria-label="upload picture" component="span">
                                            <AttachFileOutlined/>
                                        </IconButton>
                                    </label>
                                </>
                                :
                                <>
                                    <IconButton onClick={() => sendMessage(conversationId)} size="large" color="primary"><Send/></IconButton>
                                    <IconButton onClick={() => sendLocation(conversationId)} size="large" color="primary"><LocationOnOutlined/></IconButton>
                                    <label htmlFor="icon-button-file">
                                        <Input onChange={e => {
                                            setImage(e.target.files[0])
                                            setDoneImage(true)
                                        }} style={{ display: 'none' }} accept="image/*" id="icon-button-file" type="file" />

                                        {doneImage ?
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <CheckCircleOutline/>
                                            </IconButton>
                                            :
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <AttachFileOutlined/>
                                            </IconButton>
                                        }
                                    </label>
                                </>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default observer(ChatList);