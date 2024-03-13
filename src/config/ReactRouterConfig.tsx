import {createHashRouter} from "react-router-dom";
import LandingPage from "../ui/page/LandingPage";
import ProductDetailPage from "../ui/page/ProductDetailPage";
import ProductListingPage from "../ui/page/ProductListingPage"
import LoginPage from "../ui/page/LoginPage"
import ShoppingCartPage from "../ui/page/ShoppingCartPage"
import ShoppingCartVisitorPage from "../ui/page/ShoppingCartVisitor"
import SignUpPage from "../ui/page/SignUpPage"
import CermicWatchesPage from "../ui/page/CermaicWatchesPage"
import CarbonWatchesPage from "../ui/page/CarbonWatchesPage"
import MechWatchesPage from "../ui/page/MechWatchesPage"
import QuartzWatchesPage from "../ui/page/QuartzWatchesPage"
import Error404Page from "../ui/page/Error404Page";
import DisclaimerPage from "../ui/page/DisclaimerPage"
import CheckoutPage from "../ui/page/CheckoutPage";
import ThankYouPage from "../ui/page/ThankYouPage";
import SearchResultPage from "../ui/page/SearchResultPage";
import CancelledPaymentPage from "../ui/page/CancelledPaymentPage";

export const router = createHashRouter([
    {
        path: "/",
        element: <LandingPage/>
    },
    {
        path: "/product/:productId",
        element: <ProductDetailPage/>
    },
    {
        path: "/product",
        element: <ProductListingPage/>
    },
    {
        path: "/product/ceramic",
        element: <CermicWatchesPage/>
    },
    {
        path: "/product/carbon",
        element: <CarbonWatchesPage/>
    },
    {
        path: "/product/mechanical",
        element: <MechWatchesPage/>
    },
    {
        path: "/product/quartz",
        element: <QuartzWatchesPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/signup",
        element: <SignUpPage/>
    },
    {
        path: "/shoppingcart",
        element: <ShoppingCartPage/>
    },
    {
        path: "/shoppingcartvisitor",
        element: <ShoppingCartVisitorPage/>
    },
    {
        path: "/disclaimer",
        element: <DisclaimerPage/>
    },
    {
        path: "/checkout/prepare",
        element: <CheckoutPage/>
    },
    {
        path: "/*",
        element: <LandingPage/>
    },
    {
        path: "/thankyou/:tid",
        element: <ThankYouPage/>
    },
    {
        path: "/cancelled/:tid",
        element: <CancelledPaymentPage/>
    },
    {
        path: "/search",
        element: <SearchResultPage/>
    },
    {
        path: "/error",
        element: <Error404Page/>
    }
])
