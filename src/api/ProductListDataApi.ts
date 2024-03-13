import axios from "axios";
import {ProductListDto} from "../data/ProductListDto.tsx"
import {ProductDetailDto} from "../data/ProductDetailDto.tsx";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl

export async function getProductListDataApi(){
    try{
        const apiUrl = `${baseUrl}/public/product`
        const response = await axios.get<ProductListDto[]>(apiUrl)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error
    }
}

export async function getProductDetailDataApi(pid:string){
    try{
        const apiUrl = `${baseUrl}/public/product/`
        const response = await axios.get<ProductDetailDto>(apiUrl.concat(pid))
        return response.data;
    } catch (error){
        console.error(error);
        throw error
    }
}

export async function searchProductListApi(searchQuery:string){
    try{
        const apiUrl = `${baseUrl}/public/product/search?searchTerm=`
        const response = await axios.get<ProductListDto[]>(apiUrl.concat(searchQuery))
        return response.data;
    } catch (error){
        console.error(error);
        throw error
    }
}