import { NavLink, useLocation } from 'react-router-dom';
import { MessageCircle, LayoutDashboard, User as UserIcon, Smartphone, LogOut } from 'lucide-react';
import ProfileAvatar from '../common/ProfileAvatar';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = () => {
  const location = useLocation();
  const { theme } = useTheme();
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/user', label: 'User', icon: <UserIcon size={20} /> },
    { path: '/device', label: 'Device', icon: <Smartphone size={20} /> },
    { path: '/whatsapp', label: 'WhatsApp Web', icon: <MessageCircle size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-whatsapp-dark-sidebar-bg border-r border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <div className="p-4 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800">
        <ProfileAvatar src="https://i.pravatar.cc/150?img=3" alt="Profile" size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium truncate">Zero Platform</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Admin</p>
        </div>
        <ThemeToggle />
      </div>
      
      <nav className="flex-1 py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
                end={item.path === '/'}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.path === '/whatsapp' && location.pathname !== '/whatsapp' && (
                  <span className="ml-auto bg-whatsapp text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto p-2 border-t border-gray-200 dark:border-gray-800">
        <button 
          onClick={handleLogout}
          className="sidebar-item text-red-500 w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;