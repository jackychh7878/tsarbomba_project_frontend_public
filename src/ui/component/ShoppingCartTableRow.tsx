import {CircularProgress, LinearProgress, TableCell, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {UserCartItemDto} from "../../data/UserCartItemDto.tsx";
import QuantitySelector from "./QuantitySelector.tsx";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import * as UserCartDataApi from "../../api/UserCartItemApi.ts";
import {Link, useNavigate} from "react-router-dom";
import {scrollToTop} from "../../util/Utils.tsx";


type Props = {
    userCartDto: UserCartItemDto,
    userCartItemDtoList: UserCartItemDto[],
    setUserCartDto: React.Dispatch<React.SetStateAction<UserCartItemDto[] | undefined>>,
}

export default function ShoppingCartTableRow(props:Props){
    const [quantity, setQuantity] = useState<number>(props.userCartDto?.cart_quantity ?? 1);
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const handleDtoUpdate = () => {
        const updatedUserCartDto = props.userCartItemDtoList.map((value)=>{
            if (value.pid === props.userCartDto.pid){
                return {
                    ...value,
                    cart_quantity: quantity
                }
            } else {
                return value;
            }
        })
        props.setUserCartDto(updatedUserCartDto);
    }

    const updateDtoList = (updatedCartItemDto: UserCartItemDto) => {
        const updatedDtoList = props.userCartItemDtoList.map((value)=>{
            if (value.pid === updatedCartItemDto.pid){
                return updatedCartItemDto;
            } else {
                return value;
            }
        })
        return updatedDtoList;
    }

    const handleQuantityUpdate = async () => {
        try{
            setIsUpdating(true);
            const updatedCartItemDto = await UserCartDataApi.patchCartItem(props.userCartDto.pid, quantity);
            props.setUserCartDto(updateDtoList(updatedCartItemDto))
            setIsUpdating(false);
        } catch (error){
            navigate("/error")
        }
    }

    const handleDeleteCartItem = async() => {
        try{
            setIsDeleting(true);
            await UserCartDataApi.deleteCartItem(props.userCartDto.pid)
            const updatedDtoList = props.userCartItemDtoList.filter((value)=>{
                return value.pid !== props.userCartDto.pid;
            })
            props.setUserCartDto(updatedDtoList);
            setIsDeleting(false);
        } catch (error){
            navigate("/error");
        }
    }

    useEffect(()=>{
        handleDtoUpdate();
        void handleQuantityUpdate();
    },[quantity])

    const renderRow = () => {
        if (props.userCartDto){
            return (
                <>
                    <TableCell>
                        <Box sx={{display:'flex' ,alignItems:'center', gap:2}}>
                            <Link to={`/product/${props.userCartDto.pid}`}
                                  style={{ textDecoration: 'none', color: 'inherit' }}
                                  onClick={scrollToTop}
                            >
                                <img src={props.userCartDto.image_url} style={{ width:80, borderRadius: 10}}/>
                            </Link>
                            <Link to={`/product/${props.userCartDto.pid}`}
                                  style={{ textDecoration: 'none', color: 'inherit' }}
                                  onClick={scrollToTop}
                            >
                                <Typography variant="body1" component="div" sx={{fontSize:16}}>
                                    {props.userCartDto.name}
                                </Typography>
                            </Link>
                        </Box>
                    </TableCell>
                    <TableCell align="center">
                        <Typography variant="body1" component="div" sx={{fontSize:16, width:100}}>
                            ${props.userCartDto.price.toLocaleString()}
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        {
                            isUpdating
                                ? <LinearProgress color="inherit" />
                                : <Box sx={{display:'flex', flexDirection:'column' , alignItems:'center', color:'black'}}>
                                    <QuantitySelector quantity={quantity} setQuantity={setQuantity} stock={props.userCartDto.stock}/>
                                </Box>
                        }
                    </TableCell>
                    <TableCell align="right">
                        <Typography variant="body1" component="div" sx={{fontSize:16, textAlign:'right'}}>
                            ${((props.userCartDto.price * props.userCartDto.cart_quantity)).toLocaleString()}
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Button onClick={handleDeleteCartItem}>
                        {
                            isDeleting
                            ? <CircularProgress color="inherit" />
                                : <FontAwesomeIcon icon={faTrash} shake size="xl" style={{color: "#000000",}} />
                        }
                        </Button>
                    </TableCell>
                </>
            )
        } else {
            return null;
        }
    }

    return(
        <TableRow key={props.userCartDto && props.userCartDto.pid}>
            {
                renderRow()
            }
        </TableRow>
    )
}