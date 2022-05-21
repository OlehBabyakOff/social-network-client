import withStyles from "@material-ui/core/styles/withStyles";
import defaultChatMsgStyles from "./defaultChatMsgStyle";
import {Avatar, Grid, Typography} from "@mui/material";
import cx from "clsx";
import Moment from "react-moment";
import {Link} from "@material-ui/core";

const ChatMsg = withStyles(defaultChatMsgStyles, { name: 'ChatMsg' })(props => {
    const {
        classes,
        avatar,
        name,
        time,
        messages,
        image,
        side,
        GridContainerProps,
        GridItemProps,
        AvatarProps,
        getTypographyProps,
    } = props

    const attachClass = index => {
        if (index === 0) {
            return classes[`${side}First`];
        }
        if (index === messages.length - 1) {
            return classes[`${side}Last`];
        }
        return '';
    }

    const i = `${messages} + ${Math.floor(Math.random() * 2412412)}`
    const TypographyProps = getTypographyProps(messages, i, props)

    return (
        <div style={{margin: "0 20px"}}>
            <Grid
                container
                spacing={2}
                justify={side === 'right' ? 'flex-end' : 'flex-start'}
                {...GridContainerProps}
            >
                {side === 'left' && (
                    <Grid item {...GridItemProps}>
                        <Avatar
                            src={`data:buffer;base64,${avatar}`}
                            {...AvatarProps}
                            className={cx(classes.avatar, AvatarProps.className)}
                        />
                    </Grid>
                )}
                <Grid item xs={side === 'left' ? 10 : 12}>
                        <>
                            <div key={i + 1} className={classes[`${side}Row`]}>
                                <Typography
                                    align={'left'}
                                    {...TypographyProps}
                                    className={cx(
                                        classes.name,
                                        attachClass(i),
                                        TypographyProps.className
                                    )}
                                >
                                    {name}
                                </Typography>
                            </div>
                                <div key={i + 2} className={classes[`${side}Row`]}>
                                    <Typography
                                        align={'left'}
                                        {...TypographyProps}
                                        className={cx(
                                            classes.msg,
                                            classes[side],
                                            attachClass(i),
                                            TypographyProps.className
                                        )}
                                    >
                                        {image ?
                                        <Grid item xs={12}>
                                            <img src={`data:buffer;base64,${image}`} style={{width: 350, height: 300}}/>
                                        </Grid> : null}

                                        {messages.includes('https://google.com/maps') ?
                                            <Link style={{color: "inherit", textDecoration: "inherit"}} href={messages} target="_blank">Моя геолокація</Link>
                                            :
                                            messages}
                                    </Typography>
                                </div>
                            <div key={i + 3} className={classes[`${side}Row`]}>
                                <Typography
                                    align={'left'}
                                    {...TypographyProps}
                                    className={cx(
                                        classes.time,
                                        attachClass(i),
                                        TypographyProps.className
                                    )}
                                >
                                    {<Moment format="HH:mm:ss">{time}</Moment>}
                                </Typography>
                            </div>
                        </>
                </Grid>
            </Grid>
        </div>
    );
});

ChatMsg.defaultProps = {
    avatar: '',
    messages: '',
    image: '',
    name: '',
    time: '',
    side: '',
    GridContainerProps: {},
    GridItemProps: {},
    AvatarProps: {},
    getTypographyProps: () => ({}),
};

export default ChatMsg