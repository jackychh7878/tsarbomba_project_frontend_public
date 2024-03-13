import {Box, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import movementPhoto from "../../assets/freakoneCal.png"
import Grid from '@mui/material/Grid';
import Divider from "@mui/material/Divider";
import specPhoto from "../../assets/TB8208CF_spec.webp"

const data = [
    { label: 'Number of parts', value: 229 },
    { label: 'Power reserve (H)', value: 90 },
    { label: 'Frequency (Hz)', value: 3 },
    { label: 'Frequency (vph)', value: 21600 },
    { label: 'Escapement', value: 'DIAMonSIL' },
];

const dataSpec = [
    { label: 'Caliber', value: 'MIYOTA JAPENSE Manufacture Movement' },
    { label: 'Case', value: 'Carbon Fiber' },
    { label: 'Glass', value: 'Sapphire Crystal & 316L Stainless Steel' },
    { label: 'Waterproof', value: '50m' },
    { label: 'Dimension', value: 'Diameter 44mm & Height 15.5mm' },
    { label: 'Weight', value: '120g' },
];


export default function TechnicalSpec(){
    return(
        <Box sx={{bgcolor: "#0b0c0e", color: "white", m: -1, p: 16, pt: 20}}>
            <Grid  container direction="row"
                   justifyContent="flex-start"
                   spacing={2}
            >
                <Grid item xs={6}>
                    <Grid container direction="column" justifyContent="flex-start" spacing={2}>
                        <Typography variant="h6" component="div" style= {{letterSpacing: 5}}>JAPANESE MANUFACTURE MOVEMENT</Typography><br/>
                        <Typography variant="body1" component="div" style= {{letterSpacing: 1}}>Japanese movement provides a precise time and storage of energy over 48 hours.
                            It is powered by the natural movements of your wrist. Mechanical watches must be worn at least 8 to 10 hours a day,
                            if it does not get enough energy, please wind your watch manually by rotating the crown about 30 laps.</Typography><br/>
                        <Grid container spacing={2} sx={{fontSize:16}}>
                            {data.map((item, index) => (
                                <Grid item xs={6} key={index}>
                                    <p style={{fontSize:"20px"}}>
                                        <strong>{item.label}: </strong>
                                        {item.value}
                                    </p>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <img src={movementPhoto} style={{ width: '100%' }}/>
                </Grid>

            </Grid><br/><br/><br/><br/><br/>

            <Grid container direction="row"
                  justifyContent="flex-start"
                  spacing={2}
            >
                <Typography variant="h6" component="div" style= {{letterSpacing: 5}}>TECHNICAL SPECIFICATIONS</Typography><br/><br/><br/>
                <Grid container spacing={2}>
                    {dataSpec.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Stack spacing={1}>
                                <strong>{item.label}</strong>
                                <span>{item.value}</span>
                            </Stack>
                            {index !== dataSpec.length && <Divider sx={{ backgroundColor: 'white' }} />}
                        </Grid>
                    ))}
                </Grid>
            </Grid><br/><br/><br/><br/><br/><br/><br/><br/><br/>

            <Grid container direction="row"
                  alignItems="center"
                  spacing={4}
                  sx={{m:1}}
            >
                <Grid container xs={6}>
                    <Grid container direction="column" justifyContent="flex-start" spacing={2}>
                        <Typography variant="h3" component="div" style= {{letterSpacing: 5}}>TSAR BOMBA DESIGN</Typography><br/>
                        <Typography variant="body1" component="div" style= {{letterSpacing: 1}}>Each TSAR BOMBA watch goes through several processes before leaving
                            the factory, we strictly craft our watches according to ISO9001 international quality testing standards.</Typography><br/>
                    </Grid>

                </Grid>
                <Grid container xs={6}>
                    <img src={specPhoto} style={{ width: '100%' }}/>
                </Grid>
            </Grid>
        </Box>
    )
}