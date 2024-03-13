import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import {ProductListDto} from "../../data/ProductListDto.tsx";
import {Link, useNavigate} from "react-router-dom";
import {scrollToTop} from "../../util/Utils.tsx";
import * as UserCartItemApi from "../../api/UserCartItemApi.ts";
import React from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type Props={
    data: ProductListDto | undefined
}

export default function UpsellProductCard(props: Props){
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const putCartItemFromApi = async(pid:number, quantity:number)=>{
        try{
            await UserCartItemApi.putCartItem(pid, quantity)
        } catch (error){
            navigate("/error")
        }
    }

    const handleAddToCart = () => {
        if (props.data?.has_stock){
            void putCartItemFromApi(props.data.pid, 1);
            setOpen(true);
        }
    }

    return (
        <Card variant="outlined" sx={{ width: 320, height: 570}}>
            <div style={{height: 100}}>
                <Link to={`/product/${props.data?.pid ?? ''}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      onClick={scrollToTop}
                >
                    <Typography level="h2" fontSize="md" sx={{ mb: 0.5 , height: 40, width: 290}}>
                        {props.data?.name}
                    </Typography>
                </Link>
                <Typography level="body2">Availability: {props.data?.has_stock ? "In Stock" : "Out of Stock"}</Typography>
            </div>
            <AspectRatio minHeight="400px" maxHeight="400px">
                <Link to={`/product/${props.data?.pid ?? ''}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      onClick={scrollToTop}
                >
                    <img
                        src={props.data?.image_url}
                        loading="lazy"
                        alt=""
                    />
                </Link>
            </AspectRatio>
            <CardContent orientation="horizontal">
                <div>
                    <Typography level="body3">Total price:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        HKD$ {props.data?.price.toLocaleString()}
                    </Typography>
                </div>
                <Button
                    variant="solid"
                    size="sm"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ ml: 'auto', fontWeight: 600 }}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
                <Snackbar open={open} autoHideDuration={6000}>
                    <MuiAlert elevation={6} variant="filled" severity="success" sx={{ width: '100%' }}>
                        Add To Cart Success!
                    </MuiAlert>
                </Snackbar>
            </CardContent>
        </Card>
    )
}