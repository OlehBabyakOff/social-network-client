import React, {useContext, useEffect, useState} from 'react';
import {CircularProgress, ImageList, ImageListItem, Typography} from "@mui/material";
import {getGallery} from "../../api/userService";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const GaleryProfile = () => {

    const {store} = useContext(Context)

    const [gallery, setGallery] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const fetchGallery = await getGallery(store.user._id)
            setGallery(fetchGallery.data)
        }
        fetchData().then(() => setLoading(false))
    }, [])

    return (
        loading ? <CircularProgress/> :
        <>
            <Typography variant="h6" fontWeight={300} mt={2} mb={2}>
                Галерея
            </Typography>
            <ImageList sx={{ width: 505, height: 450 }}>
                {gallery.map(photo => (
                    <ImageListItem key={photo._id}>
                        <img
                            src={`data:buffer;base64,${photo.image}`}
                            srcSet={`data:buffer;base64,${photo.image}`}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
};

export default observer(GaleryProfile);