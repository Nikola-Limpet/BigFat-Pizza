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
import ProtectedRoute from '@components/common/ProtectedRoute';
import ErrorBoundary from '@components/layout/ErrorBoundary';
import OrderDetail from '@pages/OrderDetail';
import PastOrders from '../pages/PastOrders';
import AdminOrders from '../pages/AdminOrders';
import AdminDashboard from '../components/auth/AdminDashboard';
import NotFound from '../components/NotFound'; // Import NotFound component

function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} errorElement={<ErrorBoundary />} />
          <Route path="/menu" element={<Menu />} errorElement={<ErrorBoundary />} />
          <Route
            path="/menu/:categorySlug"
            element={<Menu />}
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="/menu/pizza/:slug"
            element={<PizzaDetails />}
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="/auth/login"
            element={<Login />}
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="/auth/register"
            element={<Register />}
            errorElement={<ErrorBoundary />}
          />
          <Route path="/cart" element={<Cart />} errorElement={<ErrorBoundary />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/past-orders" element={<PastOrders />} />
            <Route path="/orders/:orderId" element={<OrderDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </AnimatePresence>
  );
}

export default AppRoutes;