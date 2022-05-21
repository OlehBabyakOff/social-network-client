import React, {useState} from 'react';
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {Report} from "@mui/icons-material";
import {reportUserService} from "../../api/userService";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ReportModal = ({user, isReported, setIsReported}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [violation, setViolation] = useState('')

    const reportUser = async (id, violation) => {
        await reportUserService(id, violation)
        setIsReported(true)
        setViolation('')
        handleClose()
    }

    return (
        <>
            {isReported ?
                <Button onClick={handleOpen} disabled><Report sx={{mr: 1}}/> Поскаржитися</Button>
                :
                <Button onClick={handleOpen}><Report sx={{mr: 1}}/> Поскаржитися</Button>}


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Скарга на користувача {user.username}
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="violation"
                        label="Причина"
                        name="violation"
                        autoComplete="violation"
                        autoFocus
                        value={violation}
                        onChange={e => setViolation(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => {
                            e.preventDefault()
                            reportUser(user._id, violation)
                        }}
                    >
                        Поскаржитись
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ReportModal;