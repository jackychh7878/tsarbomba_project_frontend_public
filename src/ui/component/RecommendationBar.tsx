import {useRef} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import {ProductListDto} from "../../data/ProductListDto.tsx";
import {Link} from "react-router-dom";
import {scrollToTop} from "../../util/Utils.tsx";


type Props={
    data: ProductListDto[] | undefined
}


export default function RecommendationBar(props:Props){
    const galleryRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (galleryRef.current) {
            galleryRef.current.scrollBy({
                left: -400,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (galleryRef.current) {
            galleryRef.current.scrollBy({
                left: 400,
                behavior: 'smooth',
            });
        }
    };

    function getRandomIndices(maxIndex: number, count: number) {
        const indices:number[] = [];
        while (indices.length < count) {
            const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
            if (!indices.includes(randomIndex)) {
                indices.push(randomIndex);
            }
        }
        return indices;
    }

    const maxIndex = 29;
    const randomIndices = getRandomIndices(maxIndex, 8);

    const imageData = randomIndices.map((index) => ({
        imageUrl: props.data ? props.data[index].image_url_2 : '',
        link: `/#/product/${props.data ? props.data[index].pid : ''}`
    }));

    return (

        <Box sx={{ p: 5 }}>
            <Typography variant="h4" component="div">
                <Grid container direction="row"
                      justifyContent="flex-start"
                      spacing={2}>
                    <Grid item xs={10}><strong>OUR LATEST CREATIONS</strong></Grid>
                    <Grid item xs={2}>
                        <Button sx={{color:"black", fontSize:20}}>
                            <Link to="/product" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'inherit' }}>
                                All watches
                            </Link>
                        </Button>
                    </Grid>
                </Grid>
            </Typography>
            <br />
            <Divider />
            <br />
            <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
                <div
                    ref={galleryRef}
                    style={{ display: 'flex', overflow: 'hidden', width: '100%' }}
                >
                    {imageData.map((data, index) => (
                        <a href={data.link} onClick={scrollToTop} key={index}>
                        <img
                            key={index}
                            src={data.imageUrl}
                            alt={`Image ${index}`}
                            style={{ flex: '0 0 auto', marginRight: '10px', maxWidth:500 }}
                        />
                        </a>

                    ))}
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '10px',
                        boxSizing: 'border-box',
                    }}
                >
                    <Button onClick={scrollLeft} sx={{ color: 'white', bgcolor: 'black'}}>
                        &lt; Back
                    </Button>
                    <Button onClick={scrollRight} sx={{ color: 'white', bgcolor: 'black' }}>
                        Next &gt;
                    </Button>
                </div>
            </div>
        </Box>
    );
}