import React from 'react';
import {ImageList, ImageListItem, Typography} from "@mui/material";

const GaleryUser = () => {
    return (
        <>
            <Typography variant="h6" fontWeight={300} mt={2} mb={2}>
                Галерея
            </Typography>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            <ImageListItem >
                <img
                    src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
                    loading="lazy"
                />
            </ImageListItem>
            <ImageListItem >
                <img
                    src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
                    loading="lazy"
                />
            </ImageListItem>
            <ImageListItem >
                <img
                    src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
                    loading="lazy"
                />
            </ImageListItem>
            <ImageListItem >
                <img
                    src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
                    loading="lazy"
                />
            </ImageListItem>
            <ImageListItem >
                <img
                    src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
                    loading="lazy"
                />
            </ImageListItem>
            <ImageListItem >
                <img
                    src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
                    loading="lazy"
                />
            </ImageListItem>
            <ImageListItem >
                <img
                    src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
                    loading="lazy"
                />
            </ImageListItem>
        </ImageList>
        </>
    );
};

export default GaleryUser;