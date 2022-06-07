import React, {useEffect, useState} from 'react';
import {
    Box, Button,
    CircularProgress,
    ImageList,
    ImageListItem,
    MobileStepper,
    Paper,
    Skeleton,
    Typography, useTheme
} from "@mui/material";
import {getGallery} from "../../api/userService";
import {useParams} from "react-router-dom";
import Moment from "react-moment";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {autoPlay} from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const GaleryUser = () => {

    const {userId} = useParams()
    const theme = useTheme();

    const [gallery, setGallery] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = gallery.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    useEffect(() => {
        const fetchData = async () => {
            const fetchGallery = await getGallery(userId)
            setGallery(fetchGallery.data)
        }
        fetchData().then(() => setLoading(false))
    }, [])

    return (
        gallery.length > 0 ?
        loading ? <Skeleton variant="text" height={300} /> :
            <>
                <Box sx={{ maxWidth: 500, flexGrow: 1, mt: 2 }}>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 50,
                            pl: 2,
                            bgcolor: 'background.default',
                        }}
                    >
                        <Typography variant="h6" fontWeight={300}>
                            Галерея
                        </Typography>
                    </Paper>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {gallery.map((step, index) => (
                            <div key={index}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 300,
                                            display: 'block',
                                            maxWidth: 500,
                                            overflow: 'hidden',
                                            width: 'auto',
                                            margin: 'auto'
                                        }}
                                        src={`data:buffer;base64,${step.image}`}
                                        alt={step.createdAt}
                                    />
                                ) : null}
                                <Typography sx={{mt: 1}}><Moment format='DD.MM.YYYY'>{gallery[activeStep].createdAt}</Moment></Typography>
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                Наступна
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Попередня
                            </Button>
                        }
                    />
                </Box>
            </> : null
    );
};

export default GaleryUser;