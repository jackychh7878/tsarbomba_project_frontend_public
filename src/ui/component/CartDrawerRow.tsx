import {TableCell, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {UserCartItemDto} from "../../data/UserCartItemDto.tsx";

type Props = {
    data: UserCartItemDto | undefined
}


export default function CartDrawerRow(props:Props){

    const renderRow = () => {
        if (props.data){
            return (
                <>
                    <TableCell>
                        <Box sx={{display:'flex' ,alignItems:'center', gap:1}}>
                            <img src={props.data.image_url} style={{ width:48, borderRadius: 10}}/>
                            <Typography variant="body1" component="div" sx={{fontSize:14}}>
                                {props.data.name}
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell align="left">
                        <Typography variant="body1" component="div" sx={{fontSize:14, width:100, textAlign:'left'}}>
                            ${props.data.price.toLocaleString()}
                        </Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Box sx={{display:'flex', alignItems:'center', color:'black'}}>
                            {/*<Button variant="text" sx={{color:'black'}} onClick={()=>{handleCountMinus()}}>-</Button>*/}
                            <Box><Typography sx={{fontSize:14}}>&nbsp;{props.data.cart_quantity}&nbsp;</Typography></Box>
                            {/*<Button variant="text" sx={{color:'black'}} onClick={()=>{handleCountPlus()}}>+</Button>*/}
                        </Box>
                    </TableCell>
                    <TableCell align="left">
                        <Typography variant="body1" component="div" sx={{fontSize:14, textAlign:'left'}}>
                            ${(props.data.price * props.data.cart_quantity).toLocaleString()}
                        </Typography>
                    </TableCell>
                </>
            )
        } else {
            return null;
        }
    }

    return(
        <TableRow key={props.data && props.data.pid}>
            {
                renderRow()
            }
        </TableRow>
    )
}