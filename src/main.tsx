import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App.tsx";

import * as FirebaseAuthService from "./authService/FirebaseAuthService.ts"


FirebaseAuthService.serviceInit()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App/>
)
