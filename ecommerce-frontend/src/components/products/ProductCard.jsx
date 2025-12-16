import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, price, imageUrl, onAddToCart }) => {
  const [added, setAdded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    onAddToCart(id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="hover-expand rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
      style={{
        background: 'var(--card-bg)',
        boxShadow: '0 10px 40px var(--card-shadow)',
        color: 'var(--card-text)'
      }}
    >
      {/* Product Image */}
      <Link to={`/product/${id}`}>
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          <button 
            onClick={handleClick}
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 px-4 py-1.5 rounded-full font-medium transition-all duration-300 shadow-lg ${
              added 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
            }`}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3.5" style={{ color: 'var(--card-text)' }}>
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold transition truncate text-sm" style={{ color: 'var(--card-text)' }}>
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-2.5">
          <span className="text-lg font-bold text-blue-600">
            ₹{price.toLocaleString()}
          </span>
          <div className="flex text-yellow-400 text-xs">★★★★★</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
