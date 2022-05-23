import {useContext, useEffect, useState} from "react";
import {io} from "socket.io-client"
import {CircularProgress, createTheme, ThemeProvider} from "@mui/material";
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
import PostDetailGroup from "./pages/PostDetail/PostDetailGroup";
import Gallery from "./pages/Gallery/Gallery";

const socket = io.connect("http://localhost:5000")

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
        } else {
            store.setLoading(false)
        }
    }, [])

  return (
    <>
        <ThemeProvider theme={darkTheme}>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <News/> : <Login/>}
                    </Route>
                    <Route exact path='/me'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <Homepage/> : <Login/>}
                    </Route>
                    <Route exact path='/friends'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <Friends/> : <Login/>}
                    </Route>
                    <Route exact path='/groups'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <Groups/> : <Login/>}
                    </Route>
                    <Route exact path='/messages'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <Messages/> : <Login/>}
                    </Route>
                    <Route exact path='/post/:postId'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <PostDetail/> : <Login/>}
                    </Route>
                    <Route exact path='/group/:groupId/post/:postId'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <PostDetailGroup/> : <Login/>}
                    </Route>
                    <Route exact path='/user/:userId'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <User/> : <Login/>}
                    </Route>
                    <Route exact path='/group/:groupId'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <Group/> : <Login/>}
                    </Route>
                    <Route exact path='/chat/:userId'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                            store.user ? <Chat socket={socket}/> : <Login/>}
                    </Route>
                    <Route exact path='/groupChat'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <GroupChat/> : <Login/>}
                    </Route>
                    <Route exact path='/gallery'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                            store.user ? <Gallery/> : <Login/>}
                    </Route>
                    <Route exact path='/registration'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <Redirect to='/'/> : <Registration/>}
                    </Route>
                    <Route exact path='/login'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <Redirect to='/'/> : <Login/>}
                    </Route>
                    <Route path='*'>
                        {store.loading ? <CircularProgress sx={{position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'}}/> :
                        store.user ? <Redirect to='/'/> : <Login/>}
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    </>
  );
}

export default observer(App);
