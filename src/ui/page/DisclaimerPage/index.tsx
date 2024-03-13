import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TopNavBar from "../../component/TopNavBar.tsx";
import Footer from "../../component/Footer.tsx";
import Button from "@mui/material/Button";
import {scrollToTop} from "../../../util/Utils.tsx";
import {Link} from "react-router-dom";

export default function DisclaimerPage(){

    return(
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
                    <Typography variant="h1" sx={{fontSize:50}}><strong>Disclaimer</strong></Typography><br/>
                    <Typography variant="h6">
                        This website is created and developed by Jacky Chong as an individual school project for educational purposes only.
                        The content provided on this website is solely intended to demonstrate web development skills and techniques.
                    </Typography><br/>
                    <Typography variant="body1" sx={{color:'grey'}}>
                        Please note that this website is not a real shop, and no actual products or services are being offered for sale.
                        Any product listings, prices, or other information displayed on this website are purely fictional and do not represent real-world offerings.<br/><br/>

                        The design and functionalities of this website may have been inspired by the website located at https://tsarbomba.com/en-hk.
                        However, it is essential to understand that this website is not affiliated with or associated with the referenced website in any way.<br/><br/>

                        Visitors are advised not to make any purchasing decisions or provide any personal information through this website, as it is not a functioning e-commerce platform.
                        The purpose of this website is solely for educational and portfolio purposes.<br/><br/>

                        Jacky Chong shall not be held responsible for any actions taken by users based on the content or information presented on this website.
                        Visitors are encouraged to treat this website as a student project and not a real online shop. <br/><br/>

                        By accessing and using this website, you agree to be bound by this disclaimer. If you do not agree with any part of this disclaimer, please refrain from using this website.
                        This disclaimer is subject to change without notice, and it is the user's responsibility to check for updates. If you have any questions or concerns regarding this disclaimer or
                        the content of this website, please contact Jacky Chong at linkedin.com/in/jackychong-busi .
                    </Typography><br/><br/>
                    <Button variant="contained"><Link to="/" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>Back Home</Link></Button>

                </Container>
            </Box>
            <Footer/>
        </>
    );
}