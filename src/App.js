import {useContext, useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import News from "./pages/News/News";
import Homepage from "./pages/Homepage/Homepage";
import Friends from "./pages/Friends/Friends";
import Groups from "./pages/Groups/Groups";
import Messages from "./pages/Messages/Messages";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import PostDetail from "./pages/PostDetail/PostDetail";
import User from "./pages/User/User";
import Group from "./pages/Group/Group";
import Chat from "./pages/Chat/Chat";
import GroupChat from "./pages/GroupChat/GroupChat";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import {observer} from "mobx-react-lite";
import {Context} from "./index.js";

const App = () => {

    const {store} = useContext(Context)

    const [mode, setMode] = useState("light");
    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

  return (
    <>
        <ThemeProvider theme={darkTheme}>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        {store.user ? <News/> : <Login/>}
                    </Route>
                    <Route exact path='/me'>
                        {store.user ? <Homepage/> : <Login/>}
                    </Route>
                    <Route exact path='/friends'>
                        {store.user ? <Friends/> : <Login/>}
                    </Route>
                    <Route exact path='/groups'>
                        {store.user ? <Groups/> : <Login/>}
                    </Route>
                    <Route exact path='/messages'>
                        {store.user ? <Messages/> : <Login/>}
                    </Route>
                    <Route exact path='/post/:postId'>
                        {store.user ? <PostDetail/> : <Login/>}
                    </Route>
                    <Route exact path='/user/:userId'>
                        {store.user ? <User/> : <Login/>}
                    </Route>
                    <Route exact path='/group'>
                        {store.user ? <Group/> : <Login/>}
                    </Route>
                    <Route exact path='/chat'>
                        {store.user ? <Chat/> : <Login/>}
                    </Route>
                    <Route exact path='/groupChat'>
                        {store.user ? <GroupChat/> : <Login/>}
                    </Route>
                    <Route exact path='/registration'>
                        {store.user ? <Redirect to='/'/> : <Registration/>}
                    </Route>
                    <Route exact path='/login'>
                        {store.user ? <Redirect to='/'/> : <Login/>}
                    </Route>
                    <Route path='*'>
                        {store.user ? <Redirect to='/'/> : <Login/>}
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    </>
  );
}

export default observer(App);
