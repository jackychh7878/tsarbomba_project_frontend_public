import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import {ProductListDto} from "../../data/ProductListDto.tsx";
import Box from "@mui/material/Box";
import {Accordion, AccordionSummary} from "@mui/material";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemText from "@mui/material/ListItemText";
import {scrollToTop} from "../../util/Utils.tsx";

type Props={
    data: ProductListDto[] | undefined
}

export default function FilterBar(props:Props){

    return(
        <AppBar position="sticky"
                sx={{display: 'flex',
                    mt: -1,
                    p: 3.5,
                    bgcolor:'white',
                    color: 'black',
                    border: '1px solid'}}>
            <Toolbar>
                <Box sx={{display:'flex', justifyContent:'space-between', flexGrow:1}}>
                    <Box sx={{display:'flex', alignItems:'baseline', justifyContent:'flex-start'}}>
                        <Typography variant="h5">All watches |&nbsp;</Typography>
                        <Typography variant="h6">{props.data?.length ? `${props.data.length} watches` : ''}</Typography>
                    </Box>
                    <Box>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Filter</Typography>
                            </AccordionSummary>
                            <Button variant={"text"} onClick={scrollToTop} component={Link} to="/product/ceramic" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="Ceramic" />
                            </Button>
                            <Button variant={"text"} onClick={scrollToTop} component={Link} to="/product/carbon" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="Carbon Fiber" />
                            </Button>
                            <Button variant={"text"} onClick={scrollToTop} component={Link} to="/product/mechanical" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="Mechanical" />
                            </Button>
                            <Button variant={"text"} onClick={scrollToTop} component={Link} to="/product/quartz" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary="Quartz" />
                            </Button>
                        </Accordion>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>

    )
}