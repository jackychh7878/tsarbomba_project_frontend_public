import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils'
import {ProductDetailDto} from "../../data/ProductDetailDto.tsx";

type Props={
    data: ProductDetailDto | undefined
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function ProductCarousel(props:Props) {
    const images = [
        {
            label: 'photo 1',
            imgPath: props.data?.image_url
        },
        {
            label: 'photo 2',
            imgPath: props.data?.image_url_2,
        },
        {
            label: 'photo 3',
            imgPath: props.data?.image_url_3,
        },
        {
            label: 'photo 4',
            imgPath: props.data?.image_url_4,
        },
        {
            label: 'photo 5',
            imgPath: props.data?.image_url_5,
        },
        {
            label: 'photo 6',
            imgPath: props.data?.image_url_6,
        },
        {
            label: 'photo 7',
            imgPath: props.data?.image_url_7,
        },
        {
            label: 'photo 8',
            imgPath: props.data?.image_url_8,
        },
        {
            label: 'photo 9',
            imgPath: props.data?.image_url_9,
        },
        {
            label: 'photo 10',
            imgPath: props.data?.image_url_10,
        },
    ];

    const filteredImage = images.filter(image => image.imgPath !== null);

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = filteredImage.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: 700, flexGrow: 1}}>

            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {filteredImage.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    // height: 255,
                                    display: 'block',
                                    maxWidth: 700,
                                    overflow: 'hidden',
                                    width: '100%',
                                    borderRadius: 4
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="large"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        sx={{color: 'black'}}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="large"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                            sx={{color: 'black'}}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                    </Button>
                }
            />
        </Box>
    );
}