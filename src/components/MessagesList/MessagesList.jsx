import React from 'react';
import GroupSearch from "../Search/GroupSearch";
import {
    Avatar, Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    Stack,
    Typography
} from "@mui/material";
import {ClearOutlined, EmailOutlined, MoreVert} from "@mui/icons-material";
import MessageSearch from "../Search/MessageSearch";

const MessagesList = () => {
    return (
        <>
            <Box flex={7} p={{
                xs: 0, md: 2, display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>

                <MessageSearch/>

                <List dense sx={{width: '100%', maxWidth: 900, mt: 3, bgcolor: 'background.paper'}}>
                    <ListItem sx={{lineHeight: 2}}
                              disablePadding
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar sx={{width: 60, height: 60}}
                                        src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                                />
                            </ListItemAvatar>
                            <Stack direction="column">
                                <Typography variant="span" sx={{fontWeight: 500, ml: 2, fontSize: 18}}>Баб'як Олег</Typography>
                                <Stack direction="row" spacing={24}>
                                    <Typography variant="span" sx={{
                                        fontWeight: 300,
                                        ml: 2,
                                        fontSize: 14
                                    }}>{"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et q".slice(0, 80) + "..."}</Typography>
                                    <Typography variant="span" sx={{fontWeight: 300, fontSize: 14}}>20:13</Typography>
                                </Stack>
                            </Stack>
                        </ListItemButton>

                        <Button>
                            <ClearOutlined sx={{width: 25, height: 25}}/>
                        </Button>
                    </ListItem>
                </List>
            </Box>
        </>
    );
};

export default MessagesList;