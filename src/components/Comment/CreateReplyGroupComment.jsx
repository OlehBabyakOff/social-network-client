import React, {useState} from 'react';
import {Button, ButtonGroup, Paper, TextField} from "@mui/material";
import {createChildCommentService} from "../../api/postService";
import {createGroupChildCommentService} from "../../api/groupService";

const CreateReplyGroupComment = ({reload, setReload, groupId, postId, parentId, reply, setReply}) => {

    const [content, setContent] = useState("")

    const createChildComment = async (id, postId, parentId, content) => {
        const fd = new FormData()
        fd.append('content', content)
        await createGroupChildCommentService(id, postId, parentId, fd)
        setReload(!reload)
        setReply(!reply)
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