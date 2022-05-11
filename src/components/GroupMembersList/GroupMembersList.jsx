import React, {useContext} from 'react';
import {Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const GroupMembersList = ({member}) => {

    const {store} = useContext(Context)

    return (
        <List dense sx={{width: '100%', maxWidth: 900, mt: 1,  background: "#f9fafb"}}>
            {member.memberId !== store?.user?._id ?
            (<ListItem sx={{lineHeight: 2, background: "#f9fafb"}}
                      disablePadding
            >
                <Link style={{ textDecoration: 'inherit', color: 'inherit' }} to={`/user/${member.memberId}`}>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar sx={{width: 50, height: 50}}
                                    src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                            />
                        </ListItemAvatar>
                        <Typography variant="span" sx={{fontWeight: 500, ml: 2, fontSize: 16}}>{member.memberId}</Typography>
                    </ListItemButton>
                </Link>
                <Button sx={{fontSize: 14}}>
                    Підписатися
                </Button>
            </ListItem>) :
            (<ListItem sx={{lineHeight: 2, background: "#f9fafb"}}
                       disablePadding
        >
            <ListItem>
                <ListItemAvatar>
                    <Avatar sx={{width: 50, height: 50}}
                            src={`data:buffer;base64,${store?.user?.avatar}`}
                    />
                </ListItemAvatar>
                <Typography variant="span" sx={{fontWeight: 500, ml: 2, fontSize: 16}}>Ви</Typography>
            </ListItem>
        </ListItem>)}
        </List>
    );
};

export default observer(GroupMembersList);