import React from "react";
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductCard from "../../component/ProductCard.tsx";
import tsarbombaTeaser from "../../../assets/tsarbomba_productlist_teaser.webm"
import FilterBar from "../../component/FilterBar.tsx";
import AspectRatio from "@mui/joy/AspectRatio";
import {ProductListDto} from "../../../data/ProductListDto.tsx";
import ProductCardLoading from "../../component/ProductCardLoading.tsx";
import ProductListHorizontalGallery from "../../component/ProductListHorizontialGallery.tsx";
import TopNavBar from "../../component/TopNavBar.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as ProductListDataApi from "../../../api/ProductListDataApi.ts";
import Footer from "../../component/Footer.tsx";
import product1Teaser from "../../../assets/tsarbomba_cermicpage_TB8212C.webm";
import product2Teaser from "../../../assets/tsarbomba_productlisting_TB208CF.webm"


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
            document.title = "Tsar Bomba - Full Watches List"
            const filteredList = productListdata.filter(
                (value) => value.pid <= 16
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

    const renderResultList_2 = () => {
        if (productListdata) {
            const filteredList = productListdata.filter(
                (value) => value.pid > 16
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
            <video id="background-video" loop autoPlay muted style={{ width: '100%'}}>
                <source src={tsarbombaTeaser} type="video/webm" />
                Your browser does not support the video tag.
            </video>

            <FilterBar data={productListdata}/>

            <Box sx={{ m:20
            }}>
                <Typography variant="h4" style= {{textAlign:'center'}} component="div">COMPANION. DURABLE.<br/>QUINTESSENTIAL PIECE.</Typography><br/>
                <Typography variant="h5" style= {{textAlign:'center', letterSpacing: 4}}component="div">
                    No matter where you go, it is always the perfect match for every outfit, whether official or casual wear on any occasion.
                </Typography>
            </Box>


            <Container maxWidth={"xl"} sx={{mb: 10}}>
                <Box>
                    <Typography variant="h4" component="div">CERMAIC AUTOMATIC WATCHES</Typography>
                    <Typography variant="h6" component="div">Full Ceramic. Ergonomic double bridge design.</Typography>
                </Box><br/>
                <Box display="flex" flexDirection="row" justifyContent="flex-start" gap={5} sx={{m:2}}>
                    <Box flex={1}>
                        {productListdata && <ProductCard data={productListdata.find((value) => value.pid === 11)} />}
                    </Box>
                    <Box flex={2}>
                        <AspectRatio minHeight="580px" maxHeight="700px">
                            {/*<img*/}
                            {/*    src="https://tsarbomba.com/cdn/shop/files/5_f0dc12fa-9a77-4bd9-a617-972046b81acb.jpg?v=1688979166"*/}
                            {/*    loading="lazy"*/}
                            {/*    alt=""*/}
                            {/*    style={{ borderRadius: '10px', width: '100%', height: '100%' }}*/}
                            {/*/>*/}
                            <video id="product1" loop autoPlay muted style={{ borderRadius: '10px', width: '100%', height: '100%' }}>
                                <source src={product1Teaser} type="video/webm" />
                                Your browser does not support the video tag.
                            </video>
                        </AspectRatio>
                    </Box>
                </Box>
            </Container>

            <Container maxWidth={"xl"} sx={{mb: 10}}>
                <Box>
                    <Typography variant="h4" component="div">CARBON FIBER AUTOMATIC WATCHES</Typography>
                    <Typography variant="h6" component="div">Exquisite craftsmanship & upgraded materials.</Typography>
                </Box><br/>
                <Box display="flex" flexDirection="row" justifyContent="flex-start" gap={5} sx={{m:2}}>
                    <Box flex={1}>
                        {productListdata && <ProductCard data={productListdata.find((value) => value.pid === 6)} />}
                    </Box>
                    <Box flex={2}>
                        <AspectRatio minHeight="580px" maxHeight="700px">
                            {/*<img*/}
                            {/*    src="https://tsarbomba.com/cdn/shop/files/2_0c988565-e995-48fb-9d18-3178ccaf0990.jpg?v=1686902066"*/}
                            {/*    loading="lazy"*/}
                            {/*    alt=""*/}
                            {/*    style={{ borderRadius: '10px', width: '100%', height: '100%' }}*/}
                            {/*/>*/}
                            <video id="product2" loop autoPlay muted style={{ borderRadius: '10px', width: '100%', height: '100%' }}>
                                <source src={product2Teaser} type="video/webm" />
                                Your browser does not support the video tag.
                            </video>
                        </AspectRatio>
                    </Box>
                </Box>
            </Container>



            <ProductListHorizontalGallery/>


            <Container maxWidth={"xl"}>
                <Box sx={{ my: 1,
                            pl: 1,
                            pr: 1,
                            pt: 10
                }}>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>MECHNICAL WATCHES</Typography>
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

                <Box sx={{ my: 1,
                    pl: 1,
                    pr: 1,
                    pt: 10
                }}>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>QUARTZ WATCHES</Typography>
                    <Typography variant="h6" component="div" >Perfect for all kinds of business, casual, indoor activities, or daily use.</Typography><br/>

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
                            renderResultList_2()
                        }
                    </Box>
                </Box>
            </Container>

            <Footer/>

{/*            {[...new Array(40)]*/}
{/*                .map(*/}
{/*                    () => `Cras mattis consectetur purus sit amet fermentum.*/}
{/*Cras justo odio, dapibus ac facilisis in, egestas eget quam.*/}
{/*Morbi leo risus, porta ac consectetur ac, vestibulum at eros.*/}
{/*Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,*/}
{/*                )*/}
{/*                .join('\n')}*/}
        </React.Fragment>
    )
}