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
import ChatMessage from "./ChatMessage";

const ChatList = () => {
    return (
        <Box flex={10} p={{ xs: 0 }}>
            <Grid container component={Paper}>
                <Grid item xs={12}>
                    <List sx={{height: "screen"}}>
                        <Stack direction="row" >
                            <ListItem>
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                </ListItemIcon>
                                <ListItemText primary="John Wick"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <IconButton color="primary" component="span">
                                    <DeleteOutlineOutlined/>
                                </IconButton>
                            </ListItem>
                        </Stack>
                        <Divider/>
                        <Box sx={{overflowY: "scroll", height: "73vh", mx: 5}}>
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

export default ChatList;