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
import {getConversationService} from "../../api/chatService";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import {Skeleton} from "@mui/lab";

const MessagesList = () => {

    const {store} = useContext(Context)

    const [loading, setLoading] = useState(true)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchConversations = await getConversationService()
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
                                    <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 1000 }} to={`/chat/${conversation.participant1 === store.user._id ? conversation.participant2 : conversation.participant1}`}>
                                        <ListItem sx={{lineHeight: 2, background: "#f9fafb", margin: "20px 0"}}
                                                  disablePadding
                                        >
                                            <ListItemButton>
                                                <ListItemAvatar>
                                                    <Avatar sx={{width: 60, height: 60}}
                                                            src={`data:buffer;base64,${user.avatar}`}
                                                    />
                                                </ListItemAvatar>
                                                <Stack direction="column">
                                                    <Stack direction="row" spacing={80}>
                                                        <Typography variant="span" sx={{fontWeight: 500, ml: 2, fontSize: 18}}>{`${user.second_name} ${user.first_name}`}</Typography>
                                                        <Typography variant="span" sx={{fontWeight: 300, fontSize: 14}}>{conversation.messages.length > 0 ? <Moment format='HH:mm'>{conversation.messages[conversation.messages.length - 1].createdAt.toString()}</Moment> : null}</Typography>
                                                    </Stack>
                                                    <Typography variant="span" sx={{
                                                        fontWeight: 300,
                                                        ml: 2,
                                                        fontSize: 14
                                                    }}>{conversation.messages.length > 0 ? conversation.messages[conversation?.messages.length - 1].text.slice(0, 53) : 'Чат порожній'}</Typography>
                                                </Stack>
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                    )}
                            })}
                    </List>
                </Box>
            </>
    );
};

export default observer(MessagesList);