import Home from "../pages/customer/home";
import Menu from "../pages/customer/Menu";
import Login from "../pages/login/login";
import Register from "../pages/login/register";
import ForgotPassword from "../pages/login/forgotpassword";
import MilkteaDetail from "../pages/customer/MilkteaDetail";
import Profile from "../pages/customer/profile";
import ChangePasswordPage from "../pages/customer/ChangePasswordPage";
import Cart from "../pages/customer/cart";
import OrderPage from "../pages/customer/Order";
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/menu', component: Menu},
    {path: '/contact', component: Home},
    {path: '/stories', component: Home},
    {path: '/report', component: Home},
    {path: '/about', component: Home},
    {path: '/milktea/*', component: MilkteaDetail},
    {path: '/profile', component: Profile},
    {path: '/customer/cart', component: Cart},
    {path: '/customer/order', component: OrderPage},
    {path: '/changepassword', component: ChangePasswordPage, layout:null},
    {path: '/login', component: Login, layout: null},
    {path:'/register', component: Register, layout: null},
    {path:'/forgotpassword', component:ForgotPassword,layout: null}
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}