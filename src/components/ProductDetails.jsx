import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock product data - in a real app, this would come from an API or state management
  const product = {
    id: id || 1,
    brand: 'H&M',
    name: 'Regular Fit Cashmere jumper',
    price: 3199,
    originalPrice: 7999,
    discount: 60,
    description: 'A luxurious cashmere jumper with a regular fit. Made from 100% pure cashmere, this jumper offers exceptional softness and warmth. Perfect for both casual and formal occasions.',
    details: [
      '100% pure cashmere',
      'Regular fit',
      'Ribbed cuffs and hem',
      'Machine washable',
      'Available in multiple colors'
    ],
    colors: ['Black', 'Navy', 'Beige', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/src/img/men.png',
      '/src/img/men.png',
      '/src/img/men.png',
      '/src/img/men.png'
    ],
    inStock: true
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size');
      return;
    }
    // Add to cart logic would go here
    alert(`Added to cart: ${product.name} - ${selectedColor} - ${selectedSize} - Quantity: ${quantity}`);
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size');
      return;
    }
    // Buy now logic would go here
    alert(`Buying now: ${product.name} - ${selectedColor} - ${selectedSize} - Quantity: ${quantity}`);
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        <button className="close-button" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="product-details-grid">
          {/* Product Images Section */}
          <div className="product-images-section">
            <div className="main-image-container">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name} 
                className="main-product-image"
              />
            </div>
            <div className="thumbnail-container">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="product-info-section">
            <div className="brand-name">{product.brand}</div>
            <h1 className="product-name">{product.name}</h1>
            
            <div className="price-container">
              <div className="current-price">Rs. {product.price.toLocaleString()}</div>
              {product.originalPrice && (
                <div className="original-price">Rs. {product.originalPrice.toLocaleString()}</div>
              )}
              {product.discount && (
                <div className="discount">{product.discount}% OFF</div>
              )}
            </div>

            <div className="product-description">
              {product.description}
            </div>

            {/* Color Selection */}
            <div className="selection-container">
              <h3>Color</h3>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => handleColorSelect(color)}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="selection-container">
              <h3>Size</h3>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="selection-container">
              <h3>Quantity</h3>
              <div className="quantity-selector">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                  className="quantity-input"
                />
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            {/* Product Details */}
            <div className="product-details-list">
              <h3>Product Details</h3>
              <ul>
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 