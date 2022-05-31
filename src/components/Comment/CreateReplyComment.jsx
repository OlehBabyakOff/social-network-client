import React, {useContext, useState} from 'react';
import {Button, ButtonGroup, Paper, TextField} from "@mui/material";
import {createChildCommentService} from "../../api/postService";
import {Context} from "../../index";

const CreateReplyComment = ({reload, setReload, postId, parentId, reply, setReply}) => {

    const {store} = useContext(Context)

    const [content, setContent] = useState("")

    const createChildComment = async (id, parentId, content) => {
        if (store.user.roles.isActivated) {
            await createChildCommentService(id, parentId, content)
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
                <Button onClick={() => createChildComment(postId, parentId, content)}>Відповісти</Button>
            </ButtonGroup>
        </Paper>
    );
};

export default CreateReplyComment;