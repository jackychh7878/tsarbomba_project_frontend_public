import axios from "axios";
import {UserCartItemDto} from "../data/UserCartItemDto.tsx";
import {getAccessToken} from "../authService/FirebaseAuthService.ts";
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

export async function putCartItem (pid: number, quantity: number){
    try {
        await axios.put(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getConfig()
        )
    } catch (error){
        console.log(error)
        throw error;
    }
}

export async function getAllCartItems(){
    try {
        const response = await axios.get<UserCartItemDto[]>(`${baseUrl}/cart`, await getConfig());
        return response.data;
    } catch (error){
        console.log(error)
        throw error;
    }
}

export async function patchCartItem(pid:number, quantity:number){
    try {

        const response = await axios.patch<UserCartItemDto>(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getConfig()
        )

        return response.data
    } catch (error){
        console.log(error)
        throw error;
    }
}


export async function deleteCartItem(pid:number){
    try {
        await axios.delete(
            `${baseUrl}/cart/${pid}`,
            await getConfig()
        )
    } catch (error){
        console.log(error)
        throw error;
    }

}