import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import {ProductDetailDto} from "../../data/ProductDetailDto.tsx";
import Grid from "@mui/material/Grid";

type Props = {
    data: ProductDetailDto | undefined
}

export default function CallToActionBar(props:Props){

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    const renderPurchaseOption = () => {
        if (props.data) {
            if (props.data.stock >= 1) {
                return (
                        <Button onClick={scrollToTop} variant="outlined" sx={{border: "1px solid black", width: 300, height: 50, fontSize: 18, color:"black" }}>Order</Button>
                )
            } else {
                return(
                        <Typography variant={'h6'} sx={{border: "1px solid black", width: 300, height: 50, fontSize: 18, color:"black", borderRadius:1, textAlign:'center' }}>OUT OF STOCK</Typography>
                )
            }
        }
    };


    return(
        <AppBar position="sticky"
                sx={{display: 'flex',
                    mt: -1,
                    p: 3,
                    bgcolor:'white',
                    color: 'black',
                }}>
            <Toolbar>
                <Grid container direction="row"
                      justifyContent="flex-start"
                      spacing={2}
                      alignItems="center"
                >
                    <Grid item xs={2}>
                        <Box><img src={props.data?.image_url} style={{ width:80, borderRadius: 10}}/></Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5" component="div"  >{props.data?.name}</Typography>
                        <Typography variant="h6" component="div">HKD$ {props.data?.price.toLocaleString()}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    {renderPurchaseOption()}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>

    )

}