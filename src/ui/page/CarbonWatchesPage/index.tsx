import React, {useEffect, useState} from "react";
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductCard from "../../component/ProductCard.tsx";
import tsarbombaTeaser from "../../../assets/tsarbomba_carbonpage_teaser.webm"
import AspectRatio from "@mui/joy/AspectRatio";
import ProductCardLoading from "../../component/ProductCardLoading.tsx";
import ProductListHorizontalGallery from "../../component/ProductListHorizontialGallery.tsx";
import TopNavBar from "../../component/TopNavBar.tsx";
import Footer from "../../component/Footer.tsx";
import {ProductListDto} from "../../../data/ProductListDto.tsx";
import {useNavigate} from "react-router-dom";
import * as ProductListDataApi from "../../../api/ProductListDataApi.ts";
import product1Teaser from "../../../assets/tsarbomba_carbonpage_TB8207CF.webm";
import product2Teaser from "../../../assets/tsarbomba_carbonpage_TB8210CF.webm";


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
            document.title = "Tsar Bomba - Carbon Fiber Watches"
            const filteredList = productListdata.filter(
                (value) => value.pid >= 3 && value.pid <= 10
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

            <Box sx={{ m:20
            }}>
                <Typography variant="h4" style= {{textAlign:'center'}} component="div">COMPANION. DURABLE.<br/>QUINTESSENTIAL PIECE.</Typography><br/>
                <Typography variant="h5" style= {{textAlign:'center', letterSpacing: 4}} component="div">
                    No matter where you go, it is always the perfect match for every outfit, whether official or casual wear on any occasion.
                </Typography>
            </Box>


            <Container maxWidth={"xl"} sx={{mb: 10}}>
                <Box>
                    <Typography variant="h4" component="div">CARBON FIBER AUTOMATIC WATCHES</Typography>
                    <Typography variant="h6" component="div">316 L Carbon Fiber case. Ergonomic double bridge design.</Typography>
                </Box><br/>
                <Box display="flex" flexDirection="row" justifyContent="flex-start" gap={5} sx={{m:2}}>
                    <Box flex={1}>
                        {productListdata && <ProductCard data={productListdata.find((value) => value.pid === 8)} />}
                    </Box>
                    <Box flex={2}>
                        <AspectRatio minHeight="580px" maxHeight="700px">
                            {/*<img*/}
                            {/*    src="https://tsarbomba.com/cdn/shop/files/8_830d76f1-1e40-472c-8b7b-4eed6dbadeab.jpg?v=1688978986"*/}
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
                    <Typography variant="h6" component="div">Each case has gone through 390 processes to make the watch fit the wrist better.</Typography>
                </Box><br/>
                <Box display="flex" flexDirection="row" justifyContent="flex-start" gap={5}>
                    <Box flex={1}>
                        {productListdata && <ProductCard data={productListdata.find((value) => value.pid === 9)} />}
                    </Box>
                    <Box flex={2}>
                        <AspectRatio minHeight="580px" maxHeight="700px">
                            {/*<img*/}
                            {/*    src="https://tsarbomba.com/cdn/shop/files/6_9cfeeeef-3b0b-4f4b-9b6f-2a39fbcb0633.jpg?v=1686903315"*/}
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
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>CARBON FIBER AUTOMATIC WATCHES</Typography>
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