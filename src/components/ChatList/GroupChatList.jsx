import React from 'react';
import {
    Avatar, Box, Button, Container,
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
import {AttachFileOutlined, DeleteOutlineOutlined, LocationOnOutlined, Send} from "@mui/icons-material";
import ChatMember from "./ChatMember";
import ChatMessage from "./ChatMessage";

const GroupChatList = () => {
    return (
        <Box flex={10} p={{ xs: 0 }}>
            <Grid container component={Paper} sx={{height: "92vh"}}>
                <Grid item xs={2.5}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Спільнота 1"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Пошук користувачів" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List sx={{overflowY: "auto", height: "73vh"}}>
                        <ChatMember/>
                    </List>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={9.4}>
                    <List sx={{height: "screen"}}>
                        <Box sx={{overflowY: "scroll", height: "80vh", mx: 5}}>
                            <ChatMessage/>
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

export default GroupChatList;