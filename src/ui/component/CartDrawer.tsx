import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import {LinearProgress, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {LoginUserContext} from "../../App.tsx";
import tesarbombaLogo from "../../assets/tsarbomba_logo_black.jpeg";
import {UserCartItemDto} from "../../data/UserCartItemDto.tsx";
import {Link} from "react-router-dom";
import CartDrawerRow from "./CartDrawerRow.tsx";
import * as UserCartItemApi from "../../api/UserCartItemApi.ts"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

type Anchor = 'right';

export default function CartDrawer(){
    const loginUser = useContext(LoginUserContext)
    const [state, setState] = useState({right: false});
    const [userCartDto, setUserCartDto] = useState<UserCartItemDto[] | undefined>(undefined);


    const getAllCartItems = async () => {
        try{
            setUserCartDto(undefined);
            setUserCartDto(await UserCartItemApi.getAllCartItems());
        } catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        void getAllCartItems();
    }, [loginUser]);

    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setState({ ...state, [anchor]: open });
                void getAllCartItems()
            };

    const renderSubTotal = () => {
        let subTotal = 0;

        if (userCartDto){
            for (const cartItem of userCartDto){
                subTotal += cartItem.price * cartItem.cart_quantity
            }
        }
        return subTotal;
    }

    const renderCartDrawerBody = () =>{
        if (loginUser && userCartDto){
            return (
                <div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6" component="div" sx={{ textAlign: 'left', fontSize:16}}>
                                        Product
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="h6" component="div" sx={{ textAlign: 'left', fontSize:16 }}>
                                        Price
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="h6" component="div" sx={{ textAlign: 'center', fontSize:16 }}>
                                        Quantity
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="div" sx={{ textAlign: 'right', fontSize:16 }}>
                                        Total
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                userCartDto.map((cartItemData) => {
                                    return (
                                        <CartDrawerRow key={cartItemData.pid} data={cartItemData}/>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    <Typography variant="h6" component="div" sx={{textAlign:'right', m:2}}>
                        Sub Total: {renderSubTotal().toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'HKD'})}
                    </Typography>
                    <Box sx={{textAlign:'right', m:3}}>
                        <Link to="/shoppingcart" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button variant={"outlined"} sx={{width:200}}>TO CHECK OUT PAGE</Button>
                        </Link>
                    </Box>
                </div>
            )
        } else if (!loginUser) {
            return(
                <div>
                    <Typography variant="h6" component="div" sx={{ textAlign: 'center', fontSize:16 }}>
                        Your shopping cart is empty
                    </Typography>
                    <Box sx={{textAlign:'right', m:3}}>
                        <Link to="/shoppingcartvisitor" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button variant={"outlined"} sx={{width:200}}>LOGIN TO CONTINUE</Button>
                        </Link>
                    </Box>
                </div>
            )
        } else {
            return (
                <LinearProgress color="inherit" />
            )
        }
    }

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: 600, display: 'flex', flexDirection:'column' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box sx={{textAlign:'center'}}>
            <img
                style={{ width: 250}}
                src={tesarbombaLogo}
                loading="lazy"
                alt=""/>
            </Box>

            <Box sx={{mb:4}}>
                {
                    renderCartDrawerBody()
                }
            </Box>
        </Box>
    );

    return (
        <React.Fragment>
                <Button onClick={toggleDrawer("right", true)} color="inherit">
                    Cart &nbsp;
                    <StyledBadge badgeContent={userCartDto?.length} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>

                </Button>
                <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                >
                    {list("right")}
                </Drawer>
        </React.Fragment>
    );
}