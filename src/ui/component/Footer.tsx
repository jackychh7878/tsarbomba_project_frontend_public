import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import tesarbombaLogo from "../../assets/tsarbomba_logo.webp";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "react-router-dom";
import List from "@mui/material/List";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IGlogo from "../../assets/instagram.svg"
import FBlogo from "../../assets/square-facebook.svg"
import TWlogo from "../../assets/square-twitter.svg"
import YTlogo from "../../assets/youtube.svg"
import {scrollToTop} from "../../util/Utils.tsx";

export default function Footer(){

    return(
        <Box sx={{display:'flex', p:5, bgcolor: 'black', flexDirection: 'column'}}>
            <Typography variant={"h6"} sx={{color: 'grey'}}>TSAR BOMBA • COLLECTIONS</Typography>
            <Divider style={{backgroundColor:'grey'}}/>

            <Box sx={{display:'flex', justifyContent: 'space-between'}}>

                <Box>
                    <img
                        style={{ width: 250}}
                        src={tesarbombaLogo}
                        loading="lazy"
                        alt=""/>
                </Box>

                <List sx={{color:'white'}}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link to="/" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="THE BRAND"/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link to="/product" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="COLLECTIONS"/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link to="/product/ceramic" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="CERAMIC AUTOMATIC WATCHES"/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link to="/product/carbon" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="CARBON FIBER AUTOMATIC WATCHES"/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link to="/product/mechanical" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="MECHNICAL WATCHES"/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link to="/product/quartz" onClick={scrollToTop}  style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="QUARTZ WATCHES"/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link to="/disclaimer" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="DISCLAIMER"/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                </List>

                <Stack direction="column" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                    <Grid container sx={{mt:2}}>
                        <Grid xs={6}><Button sx={{color: 'white', width: "100%", fontSize:16}}>Historical models</Button></Grid>
                        <Grid xs={6}><Button sx={{color: 'white', width: "100%", fontSize:16}}>Servicing</Button></Grid>
                        <Grid xs={6}><Button sx={{color: 'white', width: "100%", fontSize:16}}>Pre-Owned</Button></Grid>
                        <Grid xs={6}><Button sx={{color: 'white', width: "100%", fontSize:16}}>Book an appointment</Button></Grid>
                    </Grid>

                    <Divider style={{backgroundColor:'grey'}}/>


                    <Grid container>
                        <Grid xs={6}><Typography variant={"body1"} sx={{color:'white', textAlign:'center'}}>Follow us</Typography></Grid>
                        <Grid xs={6}>
                            <Box sx={{display:'flex', justifyContent: 'space-evenly'}}>
                                <img src={FBlogo} style={{height: 24}}/>
                                <img src={TWlogo} style={{height: 24}}/>
                                <img src={IGlogo} style={{height: 24}}/>
                                <img src={YTlogo} style={{height: 24}}/>
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider style={{backgroundColor:'grey'}}/>

                    <Grid container>
                        <Grid xs={6}><Button sx={{color: 'white', width: "100%", fontSize:16}}>Contact</Button></Grid>
                        <Grid xs={6}><Button sx={{color: 'white', width: "100%", fontSize:16}}>Legals</Button></Grid>
                        <Grid xs={6}><Button sx={{color: 'white', width: "100%", fontSize:16}}>Accessibility</Button></Grid>
                        <Grid xs={6}><Button sx={{color: 'white', width: "100%", fontSize:16}}>Sitemap</Button></Grid>
                        <Grid xs={6}><Button sx={{color: 'white', width: "100%", fontSize:16}}>Most viewed pages</Button></Grid>
                        <Grid xs={6}><Button sx={{color: 'white', width: "100%", fontSize:16}}>Credits</Button></Grid>
                    </Grid>

                </Stack>
            </Box>


        </Box>
    )
}