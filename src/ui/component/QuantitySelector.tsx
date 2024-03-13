import {Dispatch, SetStateAction} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


type Props={
    quantity: number,
    setQuantity: Dispatch<SetStateAction<number>> | ((quantity: number)=> void),
    stock: number
}

export default function QuantitySelector(props: Props){
    // const[quantity, setQuantity] = useState<number>(1);

    const handleCountMinus = () =>{
        if (props.quantity > 1){
            props.setQuantity(props.quantity - 1);
        }
    }

    const handleCountPlus = () =>{
        if (props.quantity < props.stock)
                props.setQuantity(props.quantity + 1);
    }

    return(
        <Box sx={{display:'flex', alignItems:'center', color:'black'}}>
            <Button variant="outlined" sx={{border: '1px solid black', color:'black', height: 50}} onClick={()=>{handleCountMinus()}}>-</Button>
            <Box><Typography>&nbsp;&nbsp;&nbsp;&nbsp;{props.quantity}&nbsp;&nbsp;&nbsp;&nbsp;</Typography></Box>
            <Button variant="outlined" sx={{border: '1px solid black', color:'black', height: 50}} onClick={()=>{handleCountPlus()}}>+</Button>
        </Box>
    )
}