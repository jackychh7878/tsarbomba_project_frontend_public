import {useEffect, useState} from "react";
import TopNavBar from "../../component/TopNavBar.tsx";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../../component/Footer.tsx";
import Button from "@mui/material/Button";
import {scrollToTop} from "../../../util/Utils.tsx";

export default function CancelledPaymentPage(){
    const [countdown, setCountdown] = useState<number>(5);
    const navigate = useNavigate();


    useEffect(()=>{
        setTimeout(()=>{
            if (countdown > 0){
                setCountdown((prevState) => (prevState - 1))
            } else {
                navigate("/")
            }
        }, 1000)
    },[countdown])

    return (
        <>
            <TopNavBar children={<div></div>}/>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    bgcolor: 'black',
                    p:20
                }}
            >
                <Container sx={{textAlign:'center', color: 'white'}}>
                    <Typography variant="h1" sx={{fontSize:50}}><strong>Your order is cancelled. </strong></Typography><br/>
                    <Typography variant="h6">
                        {`Back to home page in ${countdown} seconds...`}
                    </Typography><br/>
                    <Button variant="contained"><Link to="/" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>Back Home</Link></Button>
                </Container>
            </Box>
            <Footer/>
        </>
    )
}