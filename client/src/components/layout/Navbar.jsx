import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';
import { FaBars, FaTimes, FaTasks, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaTasks /> },
    { name: 'Profile', path: '/profile', icon: <FaUser /> },
  ];

  return (
    <>
      <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium text-sm hidden sm:block">Hello, {user?.name || 'User'}</span>
          <Button variant="outline" onClick={logout} className="text-xs px-3 py-1 h-8">
            Logout
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900"
              aria-label="Close menu"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;
