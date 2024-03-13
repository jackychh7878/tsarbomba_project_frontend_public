import React, {useEffect, useState} from "react";
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductCard from "../../component/ProductCard.tsx";
import tsarbombaTeaser from "../../../assets/tsarbomba_quartzpage_teaser.webm"
import ProductCardLoading from "../../component/ProductCardLoading.tsx";
import TopNavBar from "../../component/TopNavBar.tsx";
import Footer from "../../component/Footer.tsx";
import {ProductListDto} from "../../../data/ProductListDto.tsx";
import {useNavigate} from "react-router-dom";
import * as ProductListDataApi from "../../../api/ProductListDataApi.ts";



export default function ProductListing(){
    const[productListdata, setProductListData] = useState<ProductListDto[] | undefined>(undefined);
    const navigate = useNavigate();

    const getProductListDataFromApi = async()=>{
        try{
            setProductListData(await ProductListDataApi.getProductListDataApi())
        } catch(error){
            navigate("/error")
        }
    }

    useEffect(()=>{
        getProductListDataFromApi();
    }, []);



    const renderResultList = () => {
        if (productListdata) {
            document.title = "Tsar Bomba - Quartz Watches"
            const filteredList = productListdata.filter(
                (value) => value.pid >= 17
            );
            return (
                <>
                    {filteredList.map((value) => (
                        <ProductCard key={value.pid} data={value} />
                    ))}
                </>
            );
        } else {
            return <ProductCardLoading />;
        }
    };

    return(
        <React.Fragment>
            <TopNavBar children={<div></div>}/>
            <video id="background-video" loop autoPlay muted style={{ width: '100%' }}>
                <source src={tsarbombaTeaser} type="video/webm" />
                Your browser does not support the video tag.
            </video>

            <Container maxWidth={"xl"}>
                <Box sx={{ my: 1,
                            pl: 1,
                            pr: 1,
                            pt: 10
                }}>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>QUARTZ WATCHES</Typography>
                    <Typography variant="h6" component="div" >Stainless steel dials are extremely durable and can last longer the lifetime if cared for properly.</Typography><br/>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        m: 1,
                        p: 1,
                        rowGap: 10,
                        columnGap: 5
                    }}>
                        {
                            renderResultList()
                        }
                    </Box>
                </Box>
            </Container>

            <Footer/>

        </React.Fragment>
    )
}