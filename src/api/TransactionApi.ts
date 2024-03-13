import axios from "axios";
import {getAccessToken} from "../authService/FirebaseAuthService.ts";
import {TransactionDetailDto} from "../data/TransactionDetailDto.tsx";
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

export async function postTransaction(){
    try{
        const response = await axios.post<TransactionDetailDto>(
            `${baseUrl}/transaction/prepare`,
            null,
            await getConfig()
        )
        return response.data;
    } catch (error){
        console.log(error)
        throw error;
    }
}

export async function getTransaction(tid: number){
    try {
        const response = await axios.get<TransactionDetailDto>(`${baseUrl}/transaction/${tid}`, await getConfig())
        return response.data
    } catch (error){
        console.log(error)
        throw error;
    }
}

export async function patchTransactionPay(tid:number){
    try {
        const response = await axios.patch(`${baseUrl}/transaction/${tid}/pay`, null, await getConfig())
        return response.data
    } catch (error){
        console.log(error)
        throw error;
    }
}

export async function patchTransactionFinish(tid:number){
    try {
        const response = await axios.patch<TransactionDetailDto>(`${baseUrl}/transaction/${tid}/finish`, null, await getConfig())
        return response.data
    } catch (error){
        console.log(error)
        throw error;
    }
}