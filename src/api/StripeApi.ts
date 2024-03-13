import {getAccessToken} from "../authService/FirebaseAuthService.ts";
import axios from "axios";
import {StripeProductDetailDto} from "../data/StripeProducDetailDto.tsx";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl

const getConfig = async () => {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        throw new Error();
    }

    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    return config;
}


export async function postStripe(tid:string, stripeProductDetailDtoList: StripeProductDetailDto[]){
    try {
        const response = await axios.post<string>(
            `${baseUrl}/create-checkout-session?tid=`.concat(tid),
            stripeProductDetailDtoList,
            await getConfig()
        )
        return response.data;

    } catch (error){
        console.log(error)
        throw error;
    }
}

