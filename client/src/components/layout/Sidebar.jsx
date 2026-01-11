import { NavLink } from 'react-router-dom';
import { FaTasks, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaTasks /> },
    { name: 'Profile', path: '/profile', icon: <FaUser /> },
  ];

  return (
    <aside className="w-64 bg-white border-r h-screen hidden md:block flex-shrink-0">
      <div className="p-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Menu</h2>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
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
    </aside>
  );
};
export default Sidebar;
