import React, {useEffect, useState} from 'react';
import {CircularProgress, ImageList, ImageListItem, Skeleton, Typography} from "@mui/material";
import {getGallery} from "../../api/userService";
import {useParams} from "react-router-dom";

const GaleryUser = () => {

    const {userId} = useParams()

    const [gallery, setGallery] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const fetchGallery = await getGallery(userId)
            setGallery(fetchGallery.data)
        }
        fetchData().then(() => setLoading(false))
    }, [])

    return (
        gallery.length > 0 ?
        loading ? <Skeleton variant="text" height={300} /> :
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
            </> : null
    );
};

export default GaleryUser;