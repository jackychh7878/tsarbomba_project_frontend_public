import {
    Container,
    LinearProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import UpsellBar from "../../component/UpsellBar.tsx";
import {ProductListDto} from "../../../data/ProductListDto.tsx";
import * as ProductListDataApi from "../../../api/ProductListDataApi.ts";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TopNavBar from "../../component/TopNavBar.tsx";
import React from "react";
import Footer from "../../component/Footer.tsx";
import {UserCartItemDto} from "../../../data/UserCartItemDto.tsx";
import * as UserCartDataApi from "../../../api/UserCartItemApi.ts"
import Box from "@mui/material/Box";
import ShoppingCartTableRow from "../../component/ShoppingCartTableRow.tsx";
import {LoginUserContext} from "../../../App.tsx";
import * as TransactionApi from "../../../api/TransactionApi.ts"



const MemorizedUpsellBar = React.memo(UpsellBar);

export default function ShoppingCartPage(){
    const navigate = useNavigate();
    const loginUser = useContext(LoginUserContext);
    const [productListdata, setProductListData] = useState<ProductListDto[] | undefined>(undefined);
    const [userCartItemDto, setUserCartItemDto] = useState<UserCartItemDto[] | undefined>(undefined);

    const getProductListDataFromApi = async()=>{
        try{
            setProductListData(undefined);
            setProductListData(await ProductListDataApi.getProductListDataApi());
        } catch(error){
            navigate("/error");
        }
    }

    const getUserCartDataFromApi = async() => {
        try{
            setUserCartItemDto(undefined);
            setUserCartItemDto(await UserCartDataApi.getAllCartItems());
        } catch (error){
            navigate("/error");
        }
    }

    const postTransactionApi = async() => {
        try{
            if (userCartItemDto && userCartItemDto.length > 0){
                const response = await TransactionApi.postTransaction();
                response && navigate("/checkout/prepare",  { state:  { tid: response.tid}})
            }
        } catch (error){
            navigate("/error");
        }
    }


    useEffect(()=>{
        void getProductListDataFromApi();
        setUserCartItemDto(undefined);
        if (loginUser){
            void getUserCartDataFromApi();
        } else if (loginUser === null){
            navigate("/shoppingcartvisitor")
        }
    }, [loginUser]);

    const calculateTotal = () => {
        let subTotal = 0;

        if (userCartItemDto){
            for (const cartItem of userCartItemDto){
                subTotal += cartItem.price * cartItem.cart_quantity
            }
        }
        return subTotal;
    }

    const renderCartTableBody = () =>{
        if (userCartItemDto) {
            document.title = "Tsar Bomba - Shopping Cart"
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6" component="div" sx={{ textAlign: 'left' }}>
                                    Product
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                                    Price
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                                    Quantity
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h6" component="div" sx={{ textAlign: 'right' }}>
                                    Total
                                </Typography>
                            </TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            userCartItemDto?.map((cartItemData) => {
                                return (
                                    <ShoppingCartTableRow key={cartItemData.pid}
                                                          userCartDto={cartItemData}
                                                          setUserCartDto={setUserCartItemDto}
                                                          userCartItemDtoList={userCartItemDto}
                                    />
                                )
                            })
                        }
                    </TableBody>
                </Table>
            )
        } else{
            return (
                <LinearProgress color="inherit" />
            )
        }
    }


    return(
        <React.Fragment>
            <TopNavBar children={<div></div>}/>
            <Container sx={{mt:20}}>
                <Box sx={{mb:4}}>
                    <Typography variant="h4" component="div" sx={{ textAlign: 'center', mb: 4 }}>Shopping Cart</Typography>
                        {
                            renderCartTableBody()
                        }
                    {/*</Table>*/}
                </Box>

                <Stack direction="column"
                       justifyContent="center"
                       alignItems="flex-end"
                       spacing={2}>
                    <Typography variant="h5" component="div">
                        Sub Total: HKD ${calculateTotal().toLocaleString()}
                </Typography>
                    <Button onClick={postTransactionApi} variant="contained" sx={{bgcolor:'black', height: 80, width: 200, fontSize:20}}>CHECK OUT</Button>
                </Stack>

                <Divider sx={{m:5}}/>

                <MemorizedUpsellBar data={productListdata}/>

            </Container>

            <Footer/>
        </React.Fragment>
    )
}