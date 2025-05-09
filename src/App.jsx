import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CategoryCards from './components/CategoryCards';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AdminLogin from './pages/AdminLogin';
import AddProductForm from './components/AddProductForm';
import WishlistPage from './pages/WishlistPage';
import Cart from './pages/Cart';
import Notification from './components/Notification';
import bodyBg from './img/body-bg.png';
import GameModesPage from './pages/GameModesPage';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated using sessionStorage
  const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
  
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

// Simple admin dashboard component
const AdminDashboard = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleLogout = () => {
    // Clear authentication status from sessionStorage
    sessionStorage.removeItem('adminAuthenticated');
    // Redirect to login page
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <p>Welcome to the admin dashboard. You are now authenticated.</p>
      <div className="admin-actions">
        <button 
          className="admin-action-btn"
          onClick={() => setIsAddProductModalOpen(true)}
        >
          Add Product
        </button>
        <button className="admin-action-btn">
          Edit Product
        </button>
        <button className="admin-action-btn">
          Delete Product
        </button>
      </div>

      <AddProductForm 
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <Notification />
          <Routes>
            <Route path="/" element={
              <div className="app">
                <Navbar />
                <SearchBar />
                <CategoryCards />
                <FilterBar />
                <ProductList />
                <Footer />
              </div>
            } />
            <Route path="/product/:productId" element={<ProductDetailsPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/game-modes" element={<GameModesPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
} 

export default App;
