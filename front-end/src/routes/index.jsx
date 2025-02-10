import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Layout from '../components/layout/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PizzaDetails from '../pages/ProductDetails';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/common/ProtectedRoute'

function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:categorySlug" element={<Menu />} />
          <Route path="/menu/pizza/:slug" element={<PizzaDetails />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />

          <Route element={<ProtectedRoute />} >
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </Layout>
    </AnimatePresence>
  );
}

export default AppRoutes;