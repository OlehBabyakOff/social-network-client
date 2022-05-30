import React, {useContext, useEffect, useState} from 'react';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {
    Avatar,
    Box,
    Button,
    IconButton, ImageList, ImageListItem, ImageListItemBar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton, Menu, MenuItem, Paper, Stack,
    Tab, TextField,
    Typography
} from "@mui/material";
import {Delete, DeleteOutlineOutlined, EmailOutlined, Image, MoreHoriz, MoreVert} from "@mui/icons-material";
import {addGalleryService, deleteGalleryService, getGallery} from "../../api/userService";
import {Context} from "../../index";
import Moment from "react-moment";
import GalleryImg from "./GalleryImg";

const GalleryList = () => {

    const {store} = useContext(Context)

    const [value, setValue] = useState('Gallery')
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(true)

    const [gallery, setGallery] = useState([])

    const [image, setImage] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            const fetchGallery = await getGallery(store.user._id)
            setGallery(fetchGallery.data)
        }
        fetchData().then(() => setLoading(false))
    }, [reload])

    const addGallery = async (img) => {
        const fd = new FormData()
        fd.append('image', img)
        await addGalleryService(fd)
        setReload(!reload)
        setValue('Gallery')
    }

    return (
        <>
            <TabContext value={value}>
                <Box flex={7} p={{xs: 0, md: 2, display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center", borderBottom: 1, borderColor: 'divider'}}>

                    <TabList onChange={handleChange}>
                        <Tab label="Моя галерея" value="Gallery" />
                        <Tab label="Додати фото" value="AddPhoto" />
                    </TabList>

                    <TabPanel value="Gallery">
                        <Paper elevation={1} sx={{p: 3, background: "#f9fafb"}}>
                            <ImageList sx={{ width: 850, height: 'auto', overflow: "hidden"}}>
                                {gallery.map(image => (
                                    <GalleryImg image={image} loading={loading} reload={reload} setReload={setReload} key={image._id}/>
                                ))}
                            </ImageList>
                        </Paper>
                    </TabPanel>

                    <TabPanel value="AddPhoto">
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                onChange={e => setImage(e.target.files[0])}
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="raised" component="span">
                                    Фото
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
                                    addGallery(image)
                                }}
                            >
                                Додати фото
                            </Button>
                        </Box>
                    </TabPanel>
                </Box>
            </TabContext>

        </>
    );
};

export default GalleryList;