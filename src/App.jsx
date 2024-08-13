
import './App.css'
import Layout from './components/layout/Layout'
import {Routes,Route} from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Policy from "./pages/Policy"
import PageNotFound from "./pages/PageNotFound"
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from "./components/Private/Private"
import AdminRoute from './components/Private/AdminRoute'
import AdminDashboard from "./pages/Admin/AdminDashboard"
import CreateProduct from './pages/Admin/CreateProduct'
import CreateCategory from './pages/Admin/CreateCategory'
import Users from './pages/Admin/Users'
import Profile from "./pages/user/Profile"
import Orders from "./pages/user/Orders"
import Products from './pages/Admin/Products'
import UpdateProduct from './pages/Admin/UpdateProduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'

import Category from "./pages/Category"
import CategoryProduct from "./pages/CategoryProduct"
import CartPage from './pages/CartPage'
import Shop from './pages/Shop'
import Recommend from './pages/Recommend'

function App() {

  return (
    <div className='bg-zinc-800 text-white'>
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/recommended" element={<Recommend/>} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/policy" element={<Policy/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/search" element={<Search/>} />

        <Route path="/category" element={<Category/>} />
        <Route path="/category/:slug" element={<CategoryProduct/>} />


        <Route path="/cart" element={<CartPage/>} />

        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<Dashboard/>}/>
          <Route path='user/profile' element={<Profile/>}/>
          <Route path='user/orders' element={<Orders/>}/>
        </Route>
        
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard/>}/>
          <Route path='admin/create-product' element={<CreateProduct/>}/>
          <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
          <Route path='admin/create-category' element={<CreateCategory/>}/>
          <Route path='admin/users' element={<Users/>}/>
          <Route path='admin/products' element={<Products/>}/>
        </Route>
        
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </Layout>
    </div>
  )
}

export default App
