import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TopNavBar from "../../component/TopNavBar.tsx";
import Footer from "../../component/Footer.tsx";
import Button from "@mui/material/Button";
import {scrollToTop} from "../../../util/Utils.tsx";
import {Link} from "react-router-dom";

export default function ShoppingCartVisitor(){

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
                    <Typography variant="h1" sx={{fontSize:50}}><strong>Login to continue</strong></Typography><br/>
                    <Typography variant="h6">
                        You need to sign in first to complete the purchase
                    </Typography><br/>
                    <Button variant="contained"><Link to="/login" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>Sign In</Link></Button>

                </Container>
            </Box>
            <Footer/>
        </>
    );
}