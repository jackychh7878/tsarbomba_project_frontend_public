import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {TransactionDetailDto} from "../../data/TransactionDetailDto.tsx";
import {useEffect, useState} from "react";
import * as TransactionApi from "../../api/TransactionApi.ts";
import {useNavigate} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import Box from "@mui/material/Box";




// const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
//     { name: 'Card type', detail: 'Visa' },
//     { name: 'Card holder', detail: 'Mr John Smith' },
//     { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//     { name: 'Expiry date', detail: '04/2024' },
// ];

type Props = {
    tid: number;
    addressFormValues: {
        firstName: string;
        lastName: string;
        address1: string;
        address2: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        saveAddress: boolean;
    };
}

export default function Review(props:Props) {
    const [transactionDto, setTransactionDto] = useState<TransactionDetailDto | undefined>(undefined);
    const navigate = useNavigate();

    const name = [props.addressFormValues.firstName, props.addressFormValues.lastName]
    const names: string[] = [];
    const address = [props.addressFormValues.address1, props.addressFormValues.address2, props.addressFormValues.city, props.addressFormValues.state, props.addressFormValues.zip, props.addressFormValues.country]
    const addresses: string[] = [];

    for (const item of address) {
        if (item.length > 0){
            addresses.push(item);
        }
    }

    for (const item of name){
        if (item.length > 0) {
            names.push(item);
        }
    }


    const getTransactionDtoFromApi = async() => {
        try{
            setTransactionDto(await TransactionApi.getTransaction(props.tid));
        } catch(error){
            navigate("/error");
        }
    }

    useEffect(()=>{
        void getTransactionDtoFromApi()
    },[])

    const renderReviewTable = ()=>{
        if (transactionDto){
            return(
                <>
                    <Typography variant="h6" gutterBottom>
                        {`Order summary tid#${transactionDto?.tid}`}
                    </Typography>
                    <List disablePadding>
                        {
                            transactionDto?.items.map((value) => (
                                <ListItem key={value.tpid} sx={{ py: 1, px: 0 }}>
                                    <Box sx={{display:'flex' ,alignItems:'center', gap:2, flexGrow:1}}>
                                        <img src={value.product.image_url} style={{ width:80, borderRadius: 10}}/>
                                        <ListItemText primary={value.product.name} secondary={`$ ${value.product.price.toLocaleString()} x ${value.quantity}`} />
                                    </Box>
                                    <Typography variant="body2">${value.subtotal.toLocaleString()}</Typography>
                                </ListItem>
                            ))}
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Total" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                HKD ${transactionDto?.total.toLocaleString()}
                            </Typography>
                        </ListItem>
                    </List>
                </>
            )
        } else {
            return <LinearProgress color="inherit" />
        }
    }

    // const shippingAddress = () => {
    //     if (props.addressFormValues){
    //         return (
    //             <Grid container spacing={2}>
    //                 <Grid item xs={12} sm={6}>
    //                     <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
    //                         Shipping
    //                     </Typography>
    //                     <Typography gutterBottom>{name.join(', ')}</Typography>
    //                     <Typography gutterBottom>{address.join(', ')}</Typography>
    //                 </Grid>
    //             </Grid>
    //         )
    //     }
    // }



    return (
        <React.Fragment>
            {
                renderReviewTable()
            }
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{names.join(', ')}</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}