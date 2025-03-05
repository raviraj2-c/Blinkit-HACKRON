import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'milk', name: 'Milk', icon: '🥛' },
  { id: 'bread', name: 'Bread & Pav', icon: '🍞' },
  { id: 'eggs', name: 'Eggs', icon: '🥚' },
  { id: 'cereals', name: 'Flakes & Kids Cereals', icon: '🥣' },
  { id: 'muesli', name: 'Muesli & Granola', icon: '🥜' },
  { id: 'oats', name: 'Oats', icon: '🌾' },
  { id: 'paneer', name: 'Paneer & Tofu', icon: '🧀' },
  { id: 'curd', name: 'Curd & Yogurt', icon: '🥛' },
];

const products = [
  {
    id: 1,
    name: 'Amul Taaza Toned Fresh Milk',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/86446a.jpg',
    quantity: '500 ml',
    price: 28,
    deliveryTime: '8 MINS',
  },
  {
    id: 2,
    name: 'Amul Gold Full Cream Fresh Milk',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/86447a.jpg',
    quantity: '500 ml',
    price: 34,
    deliveryTime: '8 MINS',
  },
  {
    id: 3,
    name: 'Doodhvale Farms Pure Desi A2 Cow Fresh Milk',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/392501a.jpg',
    quantity: '450 ml',
    price: 31,
    originalPrice: 45,
    discount: '31% OFF',
    deliveryTime: '8 MINS',
  },
];

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Categories Sidebar */}
      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="flex items-center px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
              >
                <span className="text-2xl mr-3">{category.icon}</span>
                <span className="text-gray-700">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Buy Milk Online</h1>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Sort By</span>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg border">
                <div className="relative">
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      {product.discount}
                    </span>
                  )}
                  <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {product.deliveryTime}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.quantity}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-900 font-medium">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button className="px-4 py-1 text-green-600 border border-green-600 rounded hover:bg-green-50">
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;