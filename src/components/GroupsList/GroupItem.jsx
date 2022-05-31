import React, {useContext, useState} from 'react';
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    Menu,
    MenuItem,
    Stack,
    Typography
} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {MoreVert} from "@mui/icons-material";
import {deleteGroupService, subscribeGroupService} from "../../api/groupService";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const GroupItem = ({group, reload, setReload}) => {

    const {store} = useContext(Context)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const unfollowGroup = async (id) => {
        await subscribeGroupService(id)
        setReload(!reload)
    }

    const deleteGroup = async (id) => {
        await deleteGroupService(id)
        setReload(!reload)
    }

    return (
        <>
            <ListItem sx={{lineHeight: 2, background: "#f9fafb", margin: "20px 0"}}
                      disablePadding
            >
                <Link style={{ textDecoration: 'inherit', color: 'inherit', width: 1000 }} to={`/group/${group._id}`}>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar sx={{width: 60, height: 60}}
                                    src={`data:buffer;base64,${group.avatar}`}
                            />
                        </ListItemAvatar>
                        <Stack direction="column">
                            <Typography variant="span" sx={{fontWeight: 500, ml: 2, fontSize: 18}}>{group.title}</Typography>
                        </Stack>
                    </ListItemButton>
                </Link>
                <IconButton aria-label="settings">
                    <MoreVert id="basic-button"
                              aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={handleClick}/>
                </IconButton>
            </ListItem>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    if (store.user._id === group.creatorId) {
                        deleteGroup(group._id)
                    } else {
                        unfollowGroup(group._id)
                    }
                }}>Відписатися</MenuItem>
            </Menu>
        </>
    );
};

export default observer(GroupItem);