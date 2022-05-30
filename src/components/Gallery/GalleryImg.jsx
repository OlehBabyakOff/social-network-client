import React, {useState} from 'react';
import {IconButton, ImageListItem, ImageListItemBar, Menu, MenuItem, Stack} from "@mui/material";
import Moment from "react-moment";
import {MoreHoriz} from "@mui/icons-material";
import {deleteGalleryService} from "../../api/userService";
import {Skeleton} from "@mui/lab";

const GalleryImg = ({image, loading, reload, setReload}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteGallery = async (id) => {
        await deleteGalleryService(id)
        setReload(!reload)
    }

    return (
        loading ? <Skeleton variant="rectangular" height={300} /> :
        <>
            <ImageListItem sx={{width: 'auto', height: "auto"}} key={image._id}>
                <img
                    src={`data:buffer;base64,${image.image}`}
                    srcSet={`data:buffer;base64,${image.image}`}
                    loading="lazy"
                />
                <Stack direction="row" spacing={1} justifyContent="space-between">
                    <ImageListItemBar
                        title={<Moment format='DD MM YYYY'>{image.createdAt.toString()}</Moment>}
                        position="below"
                    />
                    <IconButton aria-label="settings">
                        <MoreHoriz id="basic-button"
                                   aria-controls={open ? 'basic-menu' : undefined}
                                   aria-haspopup="true"
                                   aria-expanded={open ? 'true' : undefined}
                                   onClick={handleClick}/>
                    </IconButton>
                </Stack>
            </ImageListItem>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => deleteGallery(image._id)}>Видалити</MenuItem>
            </Menu>
        </>
    );
};

export default GalleryImg;