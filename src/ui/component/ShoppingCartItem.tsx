import Grid from "@mui/material/Grid";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import Button from "@mui/material/Button";
import {UserCartItemDto} from "../../data/UserCartItemDto.tsx";

type Props={
    data: UserCartItemDto | undefined
    // handleQuantity: React.Dispatch<React.SetStateAction<UserCartItemDto[] | undefined>>
}

export default function ShoppingCartItem(props:Props){
    const[quantity, setQuantity] = useState<number>(1);

    const handleCountMinus = () =>{
        if (quantity > 1){
            setQuantity(quantity - 1);
        }
    }
    const handleCountPlus = () =>{
        setQuantity(quantity + 1);
    }

        return(
        <Grid container direction="row"
              justifyContent="flex-start"
              spacing={2}
              sx={{alignItems: 'center'}}
        >
            <Grid item xs={1}>
                <Box><img src={props.data?.image_url} style={{ width:80, borderRadius: 10}}/></Box>
            </Grid>
            <Grid item xs={5}>
                <Typography variant="body1" component="div" sx={{fontSize:16}}>{props.data?.name}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="body1" component="div" sx={{fontSize:16, width:100, textAlign:'right'}}>${props.data?.price}</Typography>
            </Grid>
            <Grid item xs={2} sx={{alignContent:'left'}}>
                <Box sx={{display:'flex', alignItems:'center', color:'black'}}>
                    <Button variant="text" sx={{color:'black'}} onClick={()=>{handleCountMinus()}}>-</Button>
                    <Box><Typography>&nbsp;{props.data?.cart_quantity}&nbsp;</Typography></Box>
                    <Button variant="text" sx={{color:'black'}} onClick={()=>{handleCountPlus()}}>+</Button>
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="body1" component="div" sx={{fontSize:16, textAlign:'right'}}>${props.data && (props.data?.price * props.data?.cart_quantity)}</Typography>
            </Grid>


        </Grid>
    )
}