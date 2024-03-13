import {useEffect, useState} from "react";
import TopNavBar from "../../component/TopNavBar.tsx";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../../component/Footer.tsx";
// import * as TransactionApi from "../../../api/TransactionApi.ts";
import Button from "@mui/material/Button";
import {scrollToTop} from "../../../util/Utils.tsx";

export default function ThankYouPage(){
    const [countdown, setCountdown] = useState<number>(5);
    const navigate = useNavigate();
    // const {tid} = useParams();

    // const query = new URLSearchParams(document.location.search);
    // const paymentSuccess = query.get("success");

    // const handleTransactionUpdateToFinish = async () => {
    //     try{
    //         if (tid){
    //             const response = await TransactionApi.patchTransactionFinish(parseInt(tid,10));
    //             console.log("Transaction update successful:", response);
    //         }
    //     } catch (error){
    //         navigate("/error")
    //     }
    // }

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
                    <Typography variant="h1" sx={{fontSize:50}}><strong>Thank you! Your order is on its way. </strong></Typography><br/>
                    <Typography variant="h6">
                        {`Back to home page in ${countdown} seconds...`}
                    </Typography><br/>
                    {/*<Typography variant="body1" sx={{color:'grey'}}>*/}

                    {/*</Typography><br/><br/>*/}
                    <Button variant="contained"><Link to="/" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>Back Home</Link></Button>
                </Container>
            </Box>
            <Footer/>
        </>
    )
}