import {useRef} from "react";
import Button from "@mui/material/Button";

export default function ProductListHorizontalGallery(){
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

    const images = [
        'https://tsarbomba.com/cdn/shop/files/15_4aaa4f91-fa18-476e-af24-75ae11eb28ac.jpg?v=1688979128',
        'https://tsarbomba.com/cdn/shop/files/8_b558580a-5c71-4a51-b115-9ce0615fd1b1.jpg?v=1688979128',
        'https://tsarbomba.com/cdn/shop/files/4_aa6bb3db-9a3c-4cc4-b29d-d7ff125b13e6.jpg?v=1688979166',
        'https://tsarbomba.com/cdn/shop/files/8212CF.jpg?v=1688978986',
        'https://tsarbomba.com/cdn/shop/files/19_07d27b7a-4371-4113-b03e-61fa94f869f8.jpg?v=1686902066',
        'https://tsarbomba.com/cdn/shop/files/2_d4a0d880-336f-46a4-b673-2136ae84589d.jpg?v=1686883897',
        'https://tsarbomba.com/cdn/shop/files/9_7a88c284-6c38-440e-bb36-72858458c5e7_540x.jpg?v=1687147723'
    ];

    return (
        <div style={{ display: 'flex', width: '100%', position: 'relative'}}>
            <div
                ref={galleryRef}
                style={{ display: 'flex', overflow: 'hidden', width: '100%' }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        style={{ flex: '0 0 auto', marginRight: '10px', maxWidth:500 }}
                    />
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
                <Button onClick={scrollLeft} sx={{color:"white", bgcolor: "black"}}>&lt; Back</Button>
                <Button onClick={scrollRight} sx={{color:"white", bgcolor: "black"}}>Next &gt;</Button>
            </div>
        </div>
    );
}