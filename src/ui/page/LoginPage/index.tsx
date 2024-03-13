import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import TopNavBar from "../../component/TopNavBar.tsx";
import Footer from "../../component/Footer.tsx";
import {useContext, useEffect, useState} from "react";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import {useNavigate} from "react-router-dom";
import {LoginUserContext} from "../../../App.tsx";
import {GoogleLoginButton} from "react-social-login-buttons";
import {handleSignInWithGoogle} from "../../../authService/FirebaseAuthService.ts";

export default function LoginPage() {
    const navigate = useNavigate();
    const[email, setEmail] = useState<string>("");
    const[password, setPassword] = useState<string>("");
    const loginUser = useContext(LoginUserContext);

    const handleEmailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const handlePasswordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isLogin = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password);
        if (isLogin) {
            navigate("/");
        }
    }

    useEffect(()=>{
        document.title = "Tsar Bomba - Login"
        if (loginUser){
            navigate("/product")
        }
    },[loginUser])


    return (
        <>
            <TopNavBar children={<div></div>}/>
            <Stack component="main"
                   maxWidth="xs"
                   direction="row"
                   divider={<Divider orientation="vertical" flexItem />}
                   spacing={2}
                   sx={{display: 'flex', justifyContent: 'space-around', m:25}}

            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%'
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleEmailOnChange}
                            value={email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlePasswordOnChange}
                            value={password}
                        />
                        <GoogleLoginButton onClick={handleSignInWithGoogle} />
                        {/*<FacebookLoginButton onClick={handleSignInWithFacebook}/>*/}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>


                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%'
                    }}
                >
                    <Typography variant="h5">Create an account</Typography><br/>
                    <Typography variant="body2">Create a TSAR BOMBA account allows you to benefit from our exclusive
                        services like keeping up to date with our latest products and news, establishing your wishlist
                        and having the privilege to be invited to the events in your area.</Typography><br/>

                    <Button href="#/signup" variant="outlined">
                        {"Don't have an account? Sign Up"}
                    </Button>

                </Box>

            </Stack>

            <Footer/>
        </>
    );
}