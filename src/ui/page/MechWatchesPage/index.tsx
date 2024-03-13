import React, {useEffect, useState} from "react";
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductCard from "../../component/ProductCard.tsx";
import tsarbombaTeaser from "../../../assets/tsarbomba_mechpage_teaser.webm"
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
        void getProductListDataFromApi();
    }, []);


    const renderResultList = () => {
        if (productListdata) {
            document.title = "Tsar Bomba - Mechanical Watches"
            const filteredList = productListdata.filter(
                (value) => value.pid <=16
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
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>MECHANICAL WATCHES</Typography>
                    <Typography variant="h6" component="div" >The movement on the hollow dial is unobstructed, and the movement is unobstructed, and the details are breathtaking.</Typography><br/>

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