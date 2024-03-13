import {RouterProvider} from "react-router-dom";
import {router} from "./config/ReactRouterConfig.tsx"
import {createContext, useEffect, useState} from "react";
import * as FirebaseAuthService from "./authService/FirebaseAuthService.ts"
import {UserData} from "./data/UserData.ts";
import {ProductListDto} from "./data/ProductListDto.tsx";

export const LoginUserContext = createContext<UserData | null | undefined>(undefined);
export const ProductListContext = createContext<ProductListDto[] | undefined>(undefined)

function App(){
    const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);


    useEffect(()=>{
        FirebaseAuthService.handleOnAuthStateChanged(setLoginUser);
    },[])


    return (
        <>
            <LoginUserContext.Provider value={loginUser}>
                <RouterProvider router={router}/>
            </LoginUserContext.Provider>
        </>
    )
}

export default App;