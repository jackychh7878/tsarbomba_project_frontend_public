import Typography from "@mui/material/Typography";
import UpsellProductCard from "./UpsellProductCard.tsx";
import ProductCardLoading from "./ProductCardLoading.tsx";
import {ProductListDto} from "../../data/ProductListDto.tsx";
import {Box} from "@mui/material";

type Props={
    data: ProductListDto[] | undefined
}

export default function UpsellBar(props:Props){
    const generateRandomPids = () => {
        const pids: number[] = [];
        while (pids.length < 9) {
            const randomPid = Math.floor(Math.random() * (props.data?.length ?? 1)) + 1;
            if (!pids.includes(randomPid)) {
                pids.push(randomPid);
            }
        }
        return pids;
    };


    const renderResultList = () => {
        if (props.data) {

            const randomPids = generateRandomPids();

            const filteredList = props.data.filter(
                (value) => randomPids.includes(value.pid) && (value.has_stock)
            );
            return (
                <>
                    {filteredList.map((value) => (
                        <UpsellProductCard key={value.pid} data={value} />
                    ))}
                </>
            );
        } else {
            return <ProductCardLoading />;
        }
    };

    return(
        <>
            <Typography variant="h4" component="div" sx={{textAlign: 'center'}}>You may also like</Typography>
            <br/><br/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                m: 1,
                p: 1,
                rowGap: 6,
                columnGap: 5
            }}>
                {
                    renderResultList()
                }
            </Box>
        </>
    )
}