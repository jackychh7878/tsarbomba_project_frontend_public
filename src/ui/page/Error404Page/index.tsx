import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TopNavBar from "../../component/TopNavBar.tsx";
import Footer from "../../component/Footer.tsx";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {scrollToTop} from "../../../util/Utils.tsx";
import {Link, useNavigate} from "react-router-dom";
import {ProductListDto} from "../../../data/ProductListDto.tsx";
import * as ProductListDataApi from "../../../api/ProductListDataApi.ts";
import {CircularProgress} from "@mui/material";

export default function Error404Page(){
    const [currentIndex, setCurrentIndex] = useState(0);

    const[productListdata, setProductListData] = useState<ProductListDto[] | undefined>(undefined);
    const navigate = useNavigate();

    const getProductListDataFromApi = async()=>{
        try{
            setProductListData(await ProductListDataApi.getProductListDataApi())
        } catch(error){
            navigate("/error")
        }
    }

    useEffect(() => {
        void getProductListDataFromApi();
        // Automatically change the image every 5 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (productListdata ? productListdata.length : 30));
        }, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [productListdata ? productListdata.length : 30]);

    const render404Logo = () => {
        if(productListdata){
            document.title = "Tsar Bomba - Error"
            return (
                <Box sx={{display:'flex', flexDirection:'row', justifyContent: 'center'}}>
                    <Typography variant="h1" sx={{fontSize:200}}>
                        4
                    </Typography>
                    <img
                        src={productListdata && productListdata[currentIndex].image_url}
                        style={{ maxWidth: 250 }}
                    />
                    <Typography variant="h1" sx={{fontSize:200}}>
                        4
                    </Typography>
                </Box>
            )
        } else {
            return (
                <Box sx={{display:'flex', flexDirection:'row', justifyContent: 'center'}}>
                    <CircularProgress color="inherit" />
                </Box>
            )
        }
    }

    return(
        <>
            <TopNavBar children={<div></div>}/>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    bgcolor: 'black'
                }}
            >
                <Container sx={{textAlign:'center', color: 'white'}}>
                    <Typography variant="h1" sx={{fontSize:100}}><strong>Page Not Found</strong></Typography>
                    <Box sx={{display:'flex', flexDirection:'row', justifyContent: 'center'}}>
                        {
                            render404Logo()
                        }
                    </Box><br/>
                    <Typography variant="h6">
                        The page you’re looking for doesn’t exist.
                    </Typography><br/><br/>
                    <Button variant="contained"><Link to="/" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>Back Home</Link></Button>

                </Container>
            </Box>
            <Footer/>
        </>
    );
}