import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar, Box,
    Button, CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    Stack,
    Typography
} from "@mui/material";
import MessageSearch from "../Search/MessageSearch";
import {getConversationService, getMessagesService} from "../../api/chatService";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Moment from "react-moment";
import {Link, useHistory} from "react-router-dom";
import {Skeleton} from "@mui/lab";

const MessagesList = ({socket}) => {

    const {store} = useContext(Context)
    const history = useHistory()

    const [loading, setLoading] = useState(true)
    const [conversations, setConversations] = useState([])

    const joinChat = (conversationId, location) => {
        socket.emit('joinRoom', conversationId)
        history.push(location)
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchConversations = await getConversationService()
            for (const conversation of fetchConversations.data) {
                const fetchMessages = await getMessagesService(conversation._id)
                if (fetchMessages.data.length > 0) {

                    conversation.message = fetchMessages.data.slice(-1)[0].text
                    conversation.messageTime = fetchMessages.data.slice(-1)[0].createdAt

                    if (fetchMessages.data.slice(-1)[0].image) {
                        conversation.message = 'Зображення'
                    }
                }
            }
            setConversations(fetchConversations.data)

            await store.getUsers()
        }
        fetchData().then(() => setLoading(false))
    }, [])

    return (
            <>
                <Box flex={7} p={{
                    xs: 0, md: 2, display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>

                    <List dense sx={{width: '100%', maxWidth: 900, bgcolor: 'background.paper'}}>
                        {conversations.map(conversation => {
                            if (loading) {
                                return <Skeleton variant="text" height={100} />
                            } else {

                            let user = null
                            conversation.participant1 === store.user._id ?
                            user = store.users.find(user => user._id === conversation.participant2)
                            :
                            user = store.users.find(user => user._id === conversation.participant1)

                            return (
                                    <ListItem sx={{lineHeight: 2, background: "#f9fafb", margin: "20px 0"}}
                                              disablePadding
                                    key={user._id} onClick={() => joinChat(conversation._id, `/chat/${conversation._id}`)}>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar sx={{width: 60, height: 60}}
                                                        src={`data:buffer;base64,${user.avatar}`}
                                                />
                                            </ListItemAvatar>
                                            <Stack direction="column">
                                                <Stack direction="row" spacing={80}>
                                                    <Typography variant="span" sx={{fontWeight: 500, ml: 2, fontSize: 18}}>{`${user.second_name} ${user.first_name}`}</Typography>
                                                    {conversation.messageTime ?
                                                    <Typography variant="span" sx={{fontWeight: 300, fontSize: 14}}><Moment format='HH:mm'>{conversation.messageTime.toString()}</Moment></Typography> : null}
                                                </Stack>
                                                <Typography variant="span" sx={{
                                                    fontWeight: 300,
                                                    ml: 2,
                                                    fontSize: 14
                                                }}>{conversation.message ? conversation.message.length >= 60 ? conversation.message.slice(0, 60) + '...' : conversation.message : 'Чат порожній'}</Typography>
                                            </Stack>
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            })}
                    </List>
                </Box>
            </>
    );
};

export default observer(MessagesList);