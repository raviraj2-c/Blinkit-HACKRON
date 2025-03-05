import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getCategories, type Category } from '../../services/api';

const Navbar = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-8">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-yellow-400">blinkit</span>
            </Link>

            {/* Location */}
            <button className="flex items-center text-sm text-gray-700">
              <span className="font-medium">B62, Pocket B, South City I, Sect...</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Search */}
            <div className="flex-1 relative">
              <div className="flex items-center bg-gray-50 rounded-lg px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder='Search "chips"'
                  className="w-full py-2.5 px-2 bg-transparent focus:outline-none text-gray-600"
                />
              </div>
            </div>

            {/* Login */}
            <Link to="/login" className="text-gray-700 hover:text-gray-900">
              Login
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              My Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12 text-sm overflow-x-auto">
            {isLoading ? (
              <div className="animate-pulse flex space-x-8">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-24"></div>
                ))}
              </div>
            ) : (
              <>
                {categories?.slice(0, 7).map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="text-gray-700 hover:text-green-600 whitespace-nowrap"
                  >
                    {category.name}
                  </Link>
                ))}
                {categories && categories.length > 7 && (
                  <button className="text-gray-700 hover:text-green-600 flex items-center whitespace-nowrap">
                    More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;