import React, {useEffect, useState} from 'react';
import {
    Avatar, Box, Button, CircularProgress, Container,
    Divider, Fab,
    Grid, IconButton, Input,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper, Stack,
    TextField,
    Typography
} from "@mui/material";
import {AttachFileOutlined, Close, DeleteOutlineOutlined, LocationOnOutlined, Send} from "@mui/icons-material";
import ChatMessage from "./ChatMessage";
import {useHistory, useParams} from "react-router-dom";
import {getUser} from "../../api/userService";

const ChatList = ({socket}) => {

    const {userId} = useParams()
    const history = useHistory()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        socket.emit('joinRoom', userId)
        const fetchData = async () => {
            const fetchUser = await getUser(userId)
            setUser(fetchUser.data)
        }
        fetchData().then(() => setLoading(false))
    }, [])

    const closeChat = async (id) => {
        socket.emit('leaveRoom', id)
        history.push('/messages')
    }

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
                        <Box sx={{overflowY: "scroll", height: "74.5vh", mx: 1}}>
                            <ChatMessage user={user} socket={socket}/>
                        </Box>
                    </List>
                    <Divider />
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={10.5}>
                            <TextField id="outlined-basic-email" label="Введіть повідомлення..." fullWidth />
                        </Grid>
                        <Grid xs={1.5} align="center" sx={{marginTop: 0.5}}>
                            <IconButton size="large" color="primary"><Send/></IconButton>
                            <IconButton size="large" color="primary"><LocationOnOutlined/></IconButton>
                            <label htmlFor="icon-button-file">
                                <Input style={{ display: 'none' }} accept="image/*" id="icon-button-file" type="file" />
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

export default ChatList;