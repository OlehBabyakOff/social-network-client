import React, {useContext, useState} from 'react';
import {Alert} from "@mui/material";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const AlertMain = () => {

    const {store} = useContext(Context)

    const [visible, setVisible] = useState(true)

    setTimeout(() => {
        store.clearErrors()
        setVisible(false)
    }, 3000)

    return (
        visible ?
        store.errors.map(error => (
            <Alert severity="error">{error}</Alert>
        )) : null
    );
};

export default observer(AlertMain);