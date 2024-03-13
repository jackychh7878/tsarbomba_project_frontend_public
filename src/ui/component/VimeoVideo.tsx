// import {useEffect, useRef, useState} from "react";

const VimeoVideo = () => {
    // // const [vimeoAPIReady, setVimeoAPIReady] = useState(false);
    // const iframeRef = useRef(null);
    //
    // useEffect(() => {
    //     // Load the Vimeo Player API asynchronously
    //     const script = document.createElement('script');
    //     script.src = 'https://player.vimeo.com/api/player.js';
    //     script.onload = () => setVimeoAPIReady(true);
    //     document.body.appendChild(script);
    //
    //     // Cleanup: Remove the script when the component is unmounted
    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);

    // useEffect(() => {
    //     if (vimeoAPIReady && iframeRef.current) {
    //         // Create the Vimeo player once the API is loaded and the component is mounted
    //         const options = {
    //             id: 845549431,
    //             loop: true,
    //             autoplay: true,
    //             title: false,
    //             byline: false,
    //             portrait: false,
    //             controls: false, // Hide player controls (play button, timeline, etc.)
    //         };
    //
    //         const player = new window.Vimeo.Player(iframeRef.current, options);
    //
    //         // Cleanup: Destroy the player when the component is unmounted
    //         return () => {
    //             player.destroy().then(() => {
    //                 console.log('Vimeo player destroyed.');
    //             });
    //         };
    //     }
    // }, [vimeoAPIReady]);

    return (
        <div style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '0', paddingBottom: '56.25%' }}>
            {/*<iframe*/}
            {/*    ref={iframeRef}*/}
            {/*    src="https://player.vimeo.com/video/845549431"*/}
            {/*    style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}*/}
            {/*    allow="autoplay; fullscreen; picture-in-picture"*/}
            {/*    allowFullScreen*/}
            {/*></iframe>*/}
        </div>
    );
};

export default VimeoVideo;