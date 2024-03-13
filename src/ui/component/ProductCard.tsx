import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import {ProductListDto} from "../../data/ProductListDto.tsx";
import {Skeleton} from "@mui/material";
import { useState } from 'react';
import './style/ProductCardstyle.css';
import {Link} from "react-router-dom";


type Props = {
    data: ProductListDto | undefined
}

export default function ProductCard(props:Props) {
    const [hoveredImageSrc, setHoveredImageSrc] = useState<string>(props.data?.image_url ?? '');

    const handleMouseEnter = () => {
        if (props.data){
            setHoveredImageSrc(props.data.image_url_2);
        }
    };

    const handleMouseLeave = () => {
        if (props.data){
            setHoveredImageSrc(props.data.image_url);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    return (
        <Card variant="outlined" sx={{ width: 370, height: 650}}>
            <div style={{height: 100}}>
                <Typography level="h2" fontSize="md" sx={{ mb: 0.5 , height: 40, width: 300}}>
                    <Link to={`/product/${props.data?.pid ?? ''}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                          onClick={scrollToTop}
                    >
                        {props.data?.name ?? <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
                    </Link>
                </Typography>
                <Typography level="body2">Availability: {props.data?.has_stock ? "In stock" : "Out of stock" }</Typography>
                <IconButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                >
                    <BookmarkAdd />
                </IconButton>
            </div>
            <AspectRatio minHeight="480px" maxHeight="480px">
                <Link to={`/product/${props.data?.pid ?? ''}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      onClick={scrollToTop}
                >
                    <img
                        src={hoveredImageSrc ?? (props.data?.image_url ?? "https://tsarbomba.com/cdn/shop/files/1_827cf1f8-b1fb-41c9-997b-21710b0bfd5a.png?v=1686882642")}
                        loading="lazy"
                        alt=""
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="image-transition"
                    />
                </Link>

            </AspectRatio>

            <CardContent orientation="horizontal">
                <div>
                    <Typography level="body3">Total price:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        HKD$ {props.data?.price.toLocaleString() ?? <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
                    </Typography>
                </div>
                    <Button
                        variant="solid"
                        size="sm"
                        color="primary"
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', fontWeight: 600 }}
                    >
                        <Link to={`/product/${props.data?.pid ?? ''}`}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                              onClick={scrollToTop}
                        >
                            Explore

                        </Link>
                    </Button>
            </CardContent>
        </Card>
    );
}