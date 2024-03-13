import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Sidebar from "./Sidebar.tsx";
import tesarbombaLogo from "../../assets/tsarbomba_logo.webp"
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import {InputBase, LinearProgress} from "@mui/material";
import userIcon from "../../assets/user-solid.svg";
import Grid from "@mui/material/Grid";
import {Link, useNavigate} from 'react-router-dom';
import {useContext, useState} from "react";
import {LoginUserContext} from "../../App.tsx";
import * as FirebaseAuthService from "../../authService/FirebaseAuthService.ts"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {scrollToTop} from "../../util/Utils.tsx";
import CartDrawer from "./CartDrawer.tsx";

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export default function TopNavBar(props: Props) {
    const loginUser = useContext(LoginUserContext)
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();
    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            navigate('/search', {state: {searchQuery: searchQuery}});
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSignOut = () => {
        void FirebaseAuthService.handleSignOut()
    }

    const renderLoginContainer = () => {
        if(loginUser){
            return (
                <Box sx={{display:'flex', flexDirection: 'column', justifyContent: 'center', p:1}}>
                    <Box><Typography variant={"body2"}>&nbsp;Welcome! {loginUser.email}</Typography></Box>
                    <Box>
                        <Button color="inherit" onClick={handleSignOut}>Logout &nbsp;<img src={userIcon} style={{ width: 20}}/></Button>
                        <CartDrawer/>
                    </Box>
                </Box>
            )
        } else if (loginUser === null){
            return (
                <Box sx={{display:'flex', flexDirection: 'column', justifyContent: 'center', p:1}}>
                    <Box>
                        <Link to="/login"
                         style={{ textDecoration: 'none', color: 'inherit' }}
                         onClick={scrollToTop}>
                        <Button color="inherit">Login &nbsp;<img src={userIcon} style={{ width: 20}}/></Button>
                        </Link>
                        <CartDrawer/>
                    </Box>
                </Box>)
        } else if (loginUser === undefined){
            return (
                <>
                    <br/><LinearProgress color="inherit" />
                </>)
        }
    }

    return (
        <>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar sx={{bgcolor:"black", m: -2, pt:5, pl: 20, justifyContent: 'center'}}>
                        <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-around'}}>
                            <Grid xs={2}><Sidebar/></Grid>
                            <Grid xs={3}>
                                <Link to="/"
                                      style={{ textDecoration: 'none', color: 'inherit' }}
                                      onClick={scrollToTop}
                                >
                                <img
                                    style={{ width: 250}}
                                    src={tesarbombaLogo}
                                    loading="lazy"
                                    alt=""/>
                                </Link>
                            </Grid>
                            <Grid xs={2}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        value={searchQuery}
                                        onChange={handleInputChange}
                                        onKeyDown={handleSearch}
                                    />
                                </Search>
                                {
                                    renderLoginContainer()
                                }
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </>
    );
}