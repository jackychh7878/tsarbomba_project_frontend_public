import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from '../../component/AddressForm';
import PaymentForm from '../../component/PaymentForm';
import Review from '../../component/Review';
import Grid from "@mui/material/Grid";
import tesarbombaLogo from "../../../assets/tsarbomba_logo.webp";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import * as TransactionApi from "../../../api/TransactionApi.ts"
import * as StripeApi from "../../../api/StripeApi.ts"
import {StripeProductDetailDto} from "../../../data/StripeProducDetailDto.tsx";
// import {TransactionDetailDto} from "../../../data/TransactionDetailDto.tsx";
// import * as TransactionApi from "../../../api/TransactionApi.ts";


const steps = ['Shipping address', 'Review your order', 'Payment details'];


export default function CheckoutPage() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {state} = useLocation();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const {tid} = state as { tid: number }
    // const tid = state?.tid as number || null;
    const [addressFormValues, setAddressFormValues] = useState({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        saveAddress: false,
    });

    const handleTransactionUpdateToFinish = async () => {
        try{
            if (tid){
                const response = await TransactionApi.patchTransactionFinish(tid);
                console.log("Transaction update successful:", response);
                return response.status;
            }
        } catch (error){
            navigate("/error")
        }
    }

    const handleTransactionUpdateToPay = async () => {
        try{
            const stripeProductDetailDtoList: StripeProductDetailDto[] = [];
            const response = await TransactionApi.patchTransactionPay(tid);

            if (response) {
                const payingProductList = await TransactionApi.getTransaction(tid);
                for (const item of payingProductList.items) {
                    const pushStripeProduct: StripeProductDetailDto = {
                        priceId: item.product.priceId,
                        quantity: item.quantity
                    }
                    stripeProductDetailDtoList.push(pushStripeProduct);
                }
            }

            const stripeResponse = await StripeApi.postStripe(tid.toString(), stripeProductDetailDtoList)

            if (stripeResponse) {
                const response = await handleTransactionUpdateToFinish()
                if (response){
                    window.location.href = stripeResponse;
                }
            }

        } catch (error){
            navigate("/error")
        }
    }


    function getStepContent(step: number) {
        switch (step) {
            case 0:
                    return <AddressForm addressFormValues={addressFormValues} setAddressFormValues={setAddressFormValues}/>;
                case 1:
                    return <Review tid={tid} addressFormValues={addressFormValues}/>;
                case 2:
                    return <PaymentForm />;
                default:
                    throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <>
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    bgcolor: 'black'
                }}
            >
                <Toolbar>
                    <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-around', bgcolor: 'black', m:2}}>
                            <img
                                    style={{ width: 250}}
                                    src={tesarbombaLogo}
                                    loading="lazy"
                                    alt=""/>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 , mt:30}}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        {`CHECKOUT TID: #${tid}`}
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={activeStep === steps.length - 1 ? handleTransactionUpdateToPay : handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </>
    );
}