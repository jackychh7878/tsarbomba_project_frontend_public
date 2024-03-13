import TopNavBar from "../../component/TopNavBar.tsx";
import tsarbombaBanner from "../../../assets/tsarbomba_searchresultpage_banner.png"
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Footer from "../../component/Footer.tsx";
import React, {useEffect, useState} from "react";
import {ProductListDto} from "../../../data/ProductListDto.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import * as ProductListDataApi from "../../../api/ProductListDataApi.ts";
import ProductCard from "../../component/ProductCard.tsx";
import ProductCardLoading from "../../component/ProductCardLoading.tsx";

export default function SearchResultPage(){
    const[productListdata, setProductListData] = useState<ProductListDto[] | undefined>(undefined);
    const navigate = useNavigate();
    const {state} = useLocation();
    const {searchQuery} = state as { searchQuery: string };

    const searchProductListDataFromApi = async()=>{
        try{
            const response = await ProductListDataApi.searchProductListApi(searchQuery);
            response && setProductListData(response)
        } catch(error){
            navigate("/error")
        }
    }

    useEffect(()=>{
        void searchProductListDataFromApi()
    }, [searchQuery]);

    const renderResultList = () => {
        if (productListdata) {
            document.title = `Tsar Bomba - Search: ${productListdata.length} results found for "${searchQuery}"`
            return (
                <>
                    {
                        productListdata.map((value) => (
                        <ProductCard key={value.pid} data={value} />))
                    }
                </>
            );
        } else {
            return <ProductCardLoading />;
        }
    };



    return (
        <React.Fragment>
            <TopNavBar children={<div></div>}/>
            <img src={tsarbombaBanner} id ="background-banner" style={{width:'100%', marginTop: '80px'}}/>

            <Container maxWidth={"xl"}>
                <Box sx={{ my: 1,
                    pl: 1,
                    pr: 1,
                    pt: 10
                }}>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign:'center'}}>{`We found ${productListdata?.length ?? 0} results from keywords: "${searchQuery}"`}</Typography><br/>

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