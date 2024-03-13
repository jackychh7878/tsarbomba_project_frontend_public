import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

type Anchor = 'left';

export default function Sidebar() {
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({...state, [anchor]: open});
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: 700,
                p: 10,
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit'}}>
                            <ListItemText primary="THE BRAND"/>
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Link to="/product" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemText primary="COLLECTIONS"/>
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Link to="/product/ceramic" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemText primary="CERAMIC AUTOMATIC WATCHES"/>
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Link to="/product/carbon" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemText primary="CARBON FIBER AUTOMATIC WATCHES"/>
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Link to="/product/mechanical" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemText primary="MECHNICAL WATCHES"/>
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Link to="/product/quartz" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemText primary="QUARTZ WATCHES"/>
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Link to="/disclaimer" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemText primary="DISCLAIMER"/>
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Link to="/error" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemText primary="(For Developer) ERROR 404 PAGE"/>
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
                onClick={toggleDrawer("left", true)}
            >
                <MenuIcon/>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>&nbsp; MENU</Typography>
            </IconButton>
            <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
            >
                {list("left")}
            </SwipeableDrawer>
        </div>
    );
}