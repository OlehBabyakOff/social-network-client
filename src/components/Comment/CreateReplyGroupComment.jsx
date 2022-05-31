import React, {useContext, useState} from 'react';
import {Button, ButtonGroup, Paper, TextField} from "@mui/material";
import {createChildCommentService} from "../../api/postService";
import {createGroupChildCommentService} from "../../api/groupService";
import {Context} from "../../index";

const CreateReplyGroupComment = ({reload, setReload, groupId, postId, parentId, reply, setReply}) => {

    const {store} = useContext(Context)

    const [content, setContent] = useState("")

    const createChildComment = async (id, postId, parentId, content) => {
        if (store.user.roles.isActivated) {
            const fd = new FormData()
            fd.append('content', content)
            await createGroupChildCommentService(id, postId, parentId, fd)
            setReload(!reload)
            setReply(!reply)
        } else {
            store.clearErrors()
            store.setErrors('Ви не можете створювати коментарі, поки не підтвердите свій акаунт за посиланням на пошті!')
        }
    }

    return (
        <Paper elevation={0} sx={{p:"40px 20px", background: "#f9fafb", width: "95%"}}>
            <TextField
                value={content}
                onChange={e => setContent(e.target.value)}
                sx={{ width: "100%" }}
                id="standard-multiline-static"
                multiline
                rows={3}
                placeholder="Відповісти на комантар"
                variant="standard"
            />
            <ButtonGroup
                fullWidth
                variant="contained"
                aria-label="outlined primary button group"
                sx={{mt: 2}}
            >
                <Button onClick={() => createChildComment(groupId, postId, parentId, content)}>Відповісти</Button>
            </ButtonGroup>
        </Paper>
    );
};

export default CreateReplyGroupComment;