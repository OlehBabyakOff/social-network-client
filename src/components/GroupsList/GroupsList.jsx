import React, {useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton, Menu, MenuItem, Stack, Tab, TextField,
    Typography
} from "@mui/material";
import {EmailOutlined, Image, MoreVert} from "@mui/icons-material";
import GroupSearch from "../Search/GroupSearch";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {createGroupService} from "../../api/groupService";
import {Link} from "react-router-dom";

const GroupsList = ({groups, setGroups, reload, setReload, loading, setLoading, value, setValue, isDisabled, setIsDisabled, searchedGroups, setSearchedGroups}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [title, setTitle] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [bg, setBg] = useState(null)

    const createGroup = async (title, avatarImg, backgroundImg) => {
        const data = new FormData()
        data.append('title', title)
        data.append('avatar', avatarImg)
        data.append('background', backgroundImg)
        await createGroupService(data)
        setReload(!reload)
        setValue("Groups")
    }

    return (
        <TabContext value={value}>
            <Box flex={7} p={{xs: 0, md: 2, display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",}}>

                <TabList onChange={handleChange}>
                    <Tab label="Спільноти" value="Groups" />
                    <Tab label="Створити спільноту" value="CreateGroup" />
                    <Tab label="Пошук" value="Search" disabled={isDisabled}/>
                </TabList>

                <TabPanel value="Groups">

                    <GroupSearch/>

                    {loading ? null :
                    <List dense sx={{width: '100%', maxWidth: 900, mt: 3,  bgcolor: 'background.paper'}}>

                        {groups.map(group => (
                        <ListItem sx={{lineHeight: 2, background: "#f9fafb"}}
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
                            <Button>
                                <EmailOutlined sx={{width: 25, height: 25}}/>
                            </Button>
                            <IconButton aria-label="settings">
                                <MoreVert id="basic-button"
                                          aria-controls={open ? 'basic-menu' : undefined}
                                          aria-haspopup="true"
                                          aria-expanded={open ? 'true' : undefined}
                                          onClick={handleClick}/>
                            </IconButton>
                        </ListItem>))}
                    </List>}
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem>Відписатися</MenuItem>
                    </Menu>
                </TabPanel>

                <TabPanel value="CreateGroup" sx={{width: "100%"}}>

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Назва спільноти"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file1"
                            multiple
                            type="file"
                            onChange={e => setAvatar(e.target.files[0])}
                        />
                        <label htmlFor="raised-button-file1">
                            <Button variant="raised" component="span">
                                Аватар
                                <Image color="secondary"/>
                            </Button>
                        </label>

                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={e => setBg(e.target.files[0])}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span">
                                Фон
                                <Image color="secondary"/>
                            </Button>
                        </label>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(e) => {
                                e.preventDefault()
                                createGroup(title, avatar, bg)
                            }}
                        >
                            Створити спільноту
                        </Button>
                    </Box>
                </TabPanel>

                <TabPanel value="Search">

                    <GroupSearch/>

                    {loading ? null :

                        <List dense sx={{width: '100%', maxWidth: 900, mt: 3, bgcolor: 'background.paper'}}>

                            {searchedGroups?.map(group => (
                                <ListItem sx={{lineHeight: 2, background: "#f9fafb"}}
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
                                    <Button>
                                        <EmailOutlined sx={{width: 25, height: 25}}/>
                                    </Button>
                                </ListItem>
                            ))}

                        </List> }
                </TabPanel>

            </Box>
        </TabContext>
    );
};

export default GroupsList;