import React, {useContext} from "react";
import Typography from "@mui/material/Typography";
import ProductCarousel from "../../component/ProductCarousel.tsx";
import {Box, Container, Skeleton, Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import HorizontalGallery from "../../component/HorizontialGallery.tsx";
import productTeaser from "../../../assets/productTeaser.mp4";
import CallToActionBar from "../../component/CallToActionBar.tsx";
import Button from "@mui/material/Button";
import TechnicalSpec from "../../component/TechnicalSpec.tsx";
import RecommendationBar from "../../component/RecommendationBar.tsx";
import {ProductDetailDto} from "../../../data/ProductDetailDto.tsx";
import QuantitySelector from "../../component/QuantitySelector.tsx";
import TopNavBar from "../../component/TopNavBar.tsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as ProductListDataApi from "../../../api/ProductListDataApi.ts";
import {ProductListDto} from "../../../data/ProductListDto.tsx";
import Footer from "../../component/Footer.tsx";
import * as UserCartItemApi from "../../../api/UserCartItemApi.ts"
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {LoginUserContext} from "../../../App.tsx";


type Params = {
    productId: string
}

export default function ProductDetailPage(){
    const [productDetailData, setProductDetailData] = useState<ProductDetailDto | undefined>(undefined)
    const [productListdata, setProductListData] = useState<ProductListDto[] | undefined>(undefined);
    const {productId} = useParams<Params>();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState<number>(1);
    const [open, setOpen] = React.useState(false);
    const loginUser = useContext(LoginUserContext)


    const getProductDetailDataFromApi = async (pid:string) => {
        try{
            setProductDetailData(await ProductListDataApi.getProductDetailDataApi(pid))
        } catch (error){
            navigate("/error")
        }
    }

    const getProductListDataFromApi = async()=>{
        try{
            setProductListData(await ProductListDataApi.getProductListDataApi())
        } catch(error){
            navigate("/error")
        }
    }

    const putCartItemFromApi = async(pid:number, quantity:number)=>{
        try{
            await UserCartItemApi.putCartItem(pid, quantity)
        } catch (error){
            navigate("/error")
        }
    }

    const handleAddToCart = () => {
        if (productDetailData){
            void putCartItemFromApi(productDetailData.pid, quantity);
            setOpen(true);
        }
    }

    useEffect(()=>{
        if (productId){
            void getProductDetailDataFromApi(productId);
        }
        void getProductListDataFromApi();
    }, [productId]);

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 6000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [open]);


    const renderPurchaseOption = () => {
        if (productDetailData) {
            document.title = "TSAR BOMBA - " + productDetailData.name;
            if (productDetailData.stock >= 1 && loginUser) {
                return (
                    <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', columnGap: 1}}>
                        <QuantitySelector quantity={quantity} setQuantity={setQuantity} stock={productDetailData.stock}/>
                        <Button onClick={handleAddToCart} variant="outlined" sx={{border: "1px solid black", width: "100%", height: 50, fontSize: 18, color:"black"}}>Add to Cart</Button>
                        <Snackbar open={open} autoHideDuration={6000}>
                            <MuiAlert elevation={6} variant="filled" severity="success" sx={{ width: '100%' }}>
                                Add To Cart Success!
                            </MuiAlert>
                        </Snackbar>
                    </Box>
                )
            } else if (productDetailData.stock >= 1 && !loginUser) {
                return (
                    <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center', columnGap: 1}}>
                        <QuantitySelector quantity={quantity} setQuantity={setQuantity} stock={productDetailData.stock}/>
                        <Button onClick={()=>navigate("/login")}
                                variant="outlined"
                                sx={{border: "1px solid black", width: "100%", height: 50, fontSize: 18, color:"black"}}
                            >
                                Add to Cart (LOGIN TO CONTINUE)
                        </Button>
                    </Box>
                )
            }
        }
    };

    return (
        <React.Fragment>
            <TopNavBar children={<div></div>}/>
            <Box sx={{display: 'flex', mt:16, ml: 8, mr: 8, justifyContent: 'center', alignContent: 'center', columnGap: 10}}>
                <Box sx={{width:'50%'}}><ProductCarousel data={productDetailData}/></Box>
                <Box sx={{width:'50%'}}><Stack direction="column"
                       divider={<Divider orientation="horizontal" flexItem />}
                       spacing = {2}
                >
                    <Typography variant="h4" component="div">{productDetailData?.name ?? <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}</Typography>
                    <Typography variant="h5" component="div">HK$ {productDetailData?.price.toLocaleString() ?? <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}</Typography>
                    <Typography variant="body2" component="div" sx={{fontSize:16}}>
                        {productDetailData?.description ? (
                            productDetailData.description.split('\n').map((paragraph, index) => (
                                <Typography key={index} variant="body2" component="div" sx={{ fontSize: 16 }}>
                                    {paragraph}
                                </Typography>
                            ))
                        ) : (
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        )}
                    </Typography>
                    <Typography variant="h5" component="div">{productDetailData?.stock ? `In Stock: ${productDetailData.stock} left` : "Out of Stock" }</Typography>
                    {
                        renderPurchaseOption()
                    }
                </Stack>
                </Box>
            </Box><br/><br/><Divider/><br/><br/><br/><br/>


            <Container maxWidth={"xl"}>
                <Typography variant="h4" style= {{textAlign:'center'}} component="div">COMPANION. DURABLE.<br/>QUINTESSENTIAL PIECE.</Typography><br/>
                <Typography variant="h5" style= {{textAlign:'center', letterSpacing: 4}}component="div">
                    Each TSAR BOMBA watch goes through several processes before leaving the factory, we strictly craft our watches according to ISO9001 international quality testing standards.
                </Typography>
            </Container><br/><br/><br/>

            <HorizontalGallery/><br/><br/><br/><br/>

            <Typography variant="h3" style= {{textAlign:'center', letterSpacing: 4}} component="div">TSAR BOMBA - THE LEGEND CONTINUES</Typography><br/><br/><br/>

            <video id="product-video" loop autoPlay muted style={{ width: '100%', backgroundColor: "black" }}>
                <source src={productTeaser} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <CallToActionBar data={productDetailData}/>
            <TechnicalSpec/>

            <Container sx={{p:20}}>
                <Typography variant="h6" style= {{textAlign:'center', letterSpacing: 2}} component="div">"As reflected by our brand and products, we bring together the modern-day manufacturing
                    technology of advanced movements in designs inspired by old-world aesthetics.
                    TSAR BOMBA, a new-age horology brand. We take pride in our precision-engineered
                    watches, designed and crafted for the discerning connoisseur. We offer highly
                    engineered, aesthetically designed, and crafted timepieces, which reflect our
                    commitment to quality."</Typography><br/>
                <Typography variant="h6" style= {{textAlign:'center'}} component="div"><strong>Sebastian Langford, Chief Product Officer</strong></Typography>
            </Container>

            <RecommendationBar data={productListdata}/>

            <Footer/>

        </React.Fragment>
    )

}