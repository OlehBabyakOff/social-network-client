import React, {useContext, useState} from 'react';
import {Avatar, Box, Button, ButtonGroup, Paper, Stack, TextField, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import {createGroupCommentService} from "../../api/groupService";
import {Context} from "../../index";

const CreateCommentGroup = ({groupId, postId, reload, setReload}) => {

    const {store} = useContext(Context)

    const [content, setContent] = useState("")

    const createComment = async (groupId, postId, content) => {
        if (store.user.roles.isActivated) {
            const fd = new FormData()
            fd.append('content', content)
            await createGroupCommentService(groupId, postId, fd)
            setReload(!reload)
            setContent("")
        } else {
            store.clearErrors()
            store.setErrors('Ви не можете створювати коментарі, поки не підтвердите свій акаунт за посиланням на пошті!')
            setContent("")
        }
    }

    return (
        <Paper elevation={0} sx={{p:"40px 20px", background: "#f9fafb", width: "95%", marginBottom: 5}}>
            <TextField
                value={content}
                onChange={e => setContent(e.target.value)}
                sx={{ width: "100%" }}
                id="standard-multiline-static"
                multiline
                rows={3}
                placeholder="Прокоментувати новину"
                variant="standard"
            />
            <ButtonGroup
                fullWidth
                variant="contained"
                aria-label="outlined primary button group"
                sx={{mt: 2}}
            >
                <Button onClick={() => createComment(groupId, postId, content)}>Додати</Button>
            </ButtonGroup>
        </Paper>
    );
};

export default observer(CreateCommentGroup);