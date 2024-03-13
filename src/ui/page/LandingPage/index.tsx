import React, {useEffect, useState} from "react";
import TopNavBar from "../../component/TopNavBar.tsx";
import tsarbombaTeaser from "../../../assets/tsarbomba_landingpage_teaser.webm";
import introTeaser1 from "../../../assets/tsarbomba_landingpage_intro1.webm"
import introTeaser2 from "../../../assets/tsarbomba_landingpage_intro2.webm"
import introTeaser3 from "../../../assets/tsarbomba_landingpage_intro3.webm"
import introTeaser4 from "../../../assets/tsarbomba_landingpage_intro4.webm"
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import RecommendationBar from "../../component/RecommendationBar.tsx";
import Footer from "../../component/Footer.tsx";
import Divider from "@mui/material/Divider";
import {scrollToTop} from "../../../util/Utils.tsx";
import {ProductListDto} from "../../../data/ProductListDto.tsx";
import * as ProductListDataApi from "../../../api/ProductListDataApi.ts";
// import VimeoVideo from "../../component/VimeoVideo.tsx";

export default function LandingPage(){
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

    return(
        <React.Fragment>
            <TopNavBar children={<div></div>}/>

            <video id="background-video" loop autoPlay muted style={{ width: '100%' }}>
                <source src={tsarbombaTeaser} type="video/webm" />
                Your browser does not support the video tag.
            </video>

            <Box sx={{m:20}}>
                <Typography variant={"h4"} sx={{textAlign:'center', letterSpacing:4}}>INTRODUCING TSAR BOMBA</Typography><br/><br/>
                <Typography variant={"h6"} sx={{textAlign:'center'}}>
                    A Swiss Manufacture, redefining watch engineering since 1846 with unconventional design and precision.
                    Embrace the power of uniquely crafted men's watches, reflecting modern technology in vintage aesthetics.
                    Experience exceptional customer service and stand out with Tsar Bomba's distinctive style.
                </Typography>
            </Box>

            <Typography variant="h4" component="div">
                <Grid container direction="row"
                      justifyContent="flex-start"
                      spacing={2}
                      sx={{ml:2, mb:2}}
                >
                    <Grid item xs={10}><strong>OUR LATEST CREATIONS</strong></Grid>
                    <Grid item xs={2}>
                        <Button sx={{color:"black", fontSize:20}}>
                            <Link to="/product" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
                                All watches
                            </Link>
                        </Button>
                    </Grid>
                </Grid>
            </Typography>
            <Box sx={{display:'flex', justifyContent:'space-between', bgcolor:'black', pt:10, pb: 5}}>
                <Box sx={{display: 'flex', flexDirection:'column'}}>
                    <Link to="/product/ceramic" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img
                                src="https://tsarbomba.com/cdn/shop/files/5_344939e6-20f9-4224-85c9-23d9e66c26f9.jpg?v=1686903515"
                                loading="lazy"
                                alt=""
                                style={{height: '320px' }}
                            />
                        <Typography variant={"h6"} sx={{color: 'grey', textAlign:'center'}}><br/><strong>CERMAIC</strong></Typography>
                    </Link>
                </Box>
                <Box sx={{display: 'flex', flexDirection:'column'}}>
                    <Link to="/product/carbon" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img
                            src="https://tsarbomba.com/cdn/shop/files/22_8909b13c-d457-45f0-92dc-08f5dc01ae67.jpg?v=1686902066"
                            loading="lazy"
                            alt=""
                            style={{height: '320px' }}
                        />
                        <Typography variant={"h6"} sx={{color: 'grey', textAlign:'center'}}><br/><strong>CARBON FIBER</strong></Typography>
                    </Link>
                </Box>
                <Box sx={{display: 'flex', flexDirection:'column'}}>
                    <Link to="/product/mechanical" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img
                            src="https://tsarbomba.com/cdn/shop/files/17_4225fb23-b354-4e13-86c0-1cd4cbaf2122.jpg?v=1686901891"
                            loading="lazy"
                            alt=""
                            style={{height: '320px' }}
                        />
                        <Typography variant={"h6"} sx={{color: 'grey', textAlign:'center'}}><br/><strong>MECHNICAL</strong></Typography>
                    </Link>
                </Box>
                <Box sx={{display: 'flex', flexDirection:'column'}}>
                    <Link to="/product/quartz" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img
                            src="https://tsarbomba.com/cdn/shop/files/20_92168923-21fa-4cb4-af9f-59735298f88f.jpg?v=1686901680"
                            loading="lazy"
                            alt=""
                            style={{height: '320px' }}
                        />
                        <Typography variant={"h6"} sx={{color: 'grey', textAlign:'center'}}><br/><strong>QUARTZ</strong></Typography>
                    </Link>
                </Box>
            </Box>



            <Box sx={{display: 'flex', justifyContent:'space-between', mt: 20, gap: 10, mb: 10}}>
                <Box sx={{pl:20}}>
                    <video id="introTeaser1-video" loop autoPlay muted style={{maxWidth: "500px", maxHeight: "1000px", borderRadius:"10px" }}>
                    <source src={introTeaser1} type="video/webm" />
                    Your browser does not support the video tag.
                     </video>
                </Box>

                <Box sx={{pr:20}}>
                    <Typography variant={"h4"} sx={{textAlign:'flex-start', letterSpacing:4}}>A TSAR BOMBA IS BORN</Typography><br/><br/>
                    <Typography variant={"h6"} sx={{textAlign:'flex-start'}}>
                        A fusion of modern artistry and precision, reflecting disruptive design and revolutionary engineering.
                        Redefining watchmaking boundaries with exceptional savoir-faire since 1846. Stand out with our uniquely
                        crafted men's watches and experience exceptional customer service
                    </Typography>
                </Box>
            </Box>

            <Box sx={{display: 'flex', justifyContent:'space-between', mt: 20, gap: 10, mb: 10}}>
                <Box sx={{pl:20}}>
                    <Typography variant={"h4"} sx={{textAlign:'flex-start', letterSpacing:4}}>Elevating Timekeeping with Personalized Elegance</Typography><br/><br/>
                    <Typography variant={"h6"} sx={{textAlign:'flex-start'}}>
                        Elevate Your Style with Personalized Watches. Discover golden timepieces that exude elegance and luxury,
                        complementing your unique taste. Our promise is to provide exceptional customer experiences, guiding you
                        through every step. We take delight in offering you our exquisite products, and we welcome your inquiries and feedback.
                    </Typography>
                </Box>

                <Box sx={{pr:20}}>
                    <video id="introTeaser2-video" loop autoPlay muted style={{maxWidth: "500px", maxHeight: "1000px", borderRadius:"10px" }}>
                        <source src={introTeaser2} type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </Box>
            </Box>

            <Box sx={{display: 'flex', justifyContent:'space-between', mt: 20, gap: 10, mb: 10}}>
                <Box sx={{pl:20}}>
                    <video id="introTeaser3-video" loop autoPlay muted style={{maxWidth: "500px", maxHeight: "1000px", borderRadius:"10px" }}>
                        <source src={introTeaser3} type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </Box>

                <Box sx={{pr:20}}>
                    <Typography variant={"h4"} sx={{textAlign:'flex-start', letterSpacing:4}}>Pioneering Innovation in Timekeeping</Typography><br/><br/>
                    <Typography variant={"h6"} sx={{textAlign:'flex-start'}}>
                        Uniquely merging modern aesthetics with revolutionary technology, our personalized watches redefine elegance.
                        Embrace the future of horology with us, where constant progress drives us to create captivating, cutting-edge
                        timepieces tailored to your style. Join the revolution now.
                    </Typography>
                </Box>
            </Box>

            <Box sx={{m:20}}>
                <Typography variant={"h4"} sx={{textAlign:'center', letterSpacing:4}}>
                    INNOVATION UNLEASHED: Timekeeping Revolution
                </Typography><br/><br/>
                <Typography variant={"h6"} sx={{textAlign:'center'}}>
                    Personalized watches with modern aesthetics and cutting-edge tech from Le Locle. Elevate your style with us.
                </Typography>
            </Box>

            <RecommendationBar data={productListdata}/>

            <Box>
                <Typography variant={"h4"} sx={{m:5, mb:2}}><strong>OUR UPCOMING RELEASE</strong></Typography>
                <Divider/><br/>
                <video id="introTeaser4-video" loop autoPlay muted style={{width: '100%'}}>
                    <source src={introTeaser4} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            </Box>

            <Box sx={{display: 'flex', justifyContent:'center', mt: 10, gap: 10, mb: 10}}>
                <Box sx={{pl:20, textAlign: 'center', mt:25}}>
                    <Typography variant={"h4"} sx={{letterSpacing:4}}>VISIT US</Typography><br/><br/>
                    <Typography variant={"h6"}>
                        Find now your closest boutique or authorized retailer nearby you.
                    </Typography><br/>
                    <Button variant="outlined"><Typography variant={"h6"}>STORE LOCATOR</Typography></Button>
                </Box>

                <Box >
                    <img
                        src="https://cdn.shopify.com/s/files/1/0540/8145/4255/files/07.jpg?v=1669107338"
                        loading="lazy"
                        alt=""
                        style={{height: '700px' }}
                    />
                </Box>

            </Box>

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