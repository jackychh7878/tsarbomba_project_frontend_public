import {useRef} from "react";
import Button from "@mui/material/Button";

export default function HorizontalGallery(){
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
        'https://tsarbomba.com/cdn/shop/files/8208CF_5.jpg?v=1686902066',
        'https://tsarbomba.com/cdn/shop/files/8208CF_1_43354776-29c6-4e5d-a336-38abc411c692.jpg?v=1686902066',
        'https://tsarbomba.com/cdn/shop/files/8208CF_8f21a122-fd25-4199-92a9-fb71e763a5a5.jpg?v=1686902066',
        'https://tsarbomba.com/cdn/shop/files/8208CF_7.jpg?v=1686902066',
        'https://tsarbomba.com/cdn/shop/files/8208CF_6.jpg?v=1687933514',
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