import Typography from "@mui/joy/Typography";
import {Skeleton} from "@mui/material";
import IconButton from "@mui/joy/IconButton";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";

export default function ProductCardLoading(){
    return(
        <Card variant="outlined" sx={{ width: 370, height: 650}}>
            <div>
                <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </Typography>
                <Typography level="body2"><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Typography>
                <IconButton
                    aria-label="bookmark Bahamas Islands"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                >
                    <BookmarkAdd />
                </IconButton>
            </div>
            <AspectRatio minHeight="500px" maxHeight="700px">
                <Skeleton variant="rectangular" width={"100%"} height={500} />
            </AspectRatio>
            <CardContent orientation="horizontal">
                <div>
                    <Typography level="body3">Total price:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </Typography>
                </div>
                <Button
                    variant="solid"
                    size="sm"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ ml: 'auto', fontWeight: 600 }}
                >
                    Explore
                </Button>
            </CardContent>
        </Card>
    )

}